import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createTask, getTasks, updateTask, deleteTask } from "../../../api/tasks.api";
import { getProjection, updateProjection } from '../../../api/projections.api';
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'react-hot-toast';
import Navigation from './Navigation/Navigation'; 

// Componente de Spinner discreto
const LoadingSpinner = () => (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-36 w-36 border-t-8 border-b-8 border-blue-500"></div>
            <p className="text-white text-3xl font-semibold mt-4 animate-pulse text-center">
                Guardando los cambios...
            </p>
        </div>
    </div>

);

const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function KanbanBoard() {

    // Estado para almacenar los colores generados para cada proyección
    const [projectionColors, setProjectionColors] = useState({});

    // Get Tasks from the API
    const [tasks, setTasks] = useState([]);

    // Get user ID from the token
    const [userId, setUserId] = useState(null);

    // Loading state (Pantalla de carga XD)
    const [loading, setLoading] = useState(true);
    const [isTaskLoading, setIsTaskLoading] = useState(false);  // Pantalla de carga para tareas (crear/editar)

    // Estado para guardar las proyecciones traídas de la API
    const [projections, setProjections] = useState([]);
    
    // New task state
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'Media',
        status: 'todo',
        start_date: '',
        end_date: ''
    });

    // Error state
    const [error, setError] = useState(null);

    // Modal state, to show or hide the task creation form
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const newProjectionColors = {};

        // Generar color aleatorio para cada proyección si aún no tiene uno
        projections.forEach(projection => {
            if (!newProjectionColors[projection.id]) {
                newProjectionColors[projection.id] = generateRandomColor();
            }
        });

        setProjectionColors(newProjectionColors);  // Almacenar los colores generados
    }, [projections]);  // Se ejecuta cuando las proyecciones cambian

    // Decode JWT once at the start and get the user ID
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            setLoading(false); // Stop loading if no token is found
        }
    }, []);

    // Fetch tasks only when userId is set
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(userId);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Error fetching tasks.');
            }
        };
    
        const fetchProjections = async () => {
            try {
                const response = await getProjection(userId);
                setProjections(response.data); // Guardar las proyecciones en el estado
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching projections:', error);
                setError('Error fetching projections.');
            }
        };
    
        const fetchData = async () => {
            setLoading(true); // Inicia la carga
            try {
                // Ejecuta ambas funciones en paralelo y espera a que ambas terminen
                await Promise.all([fetchTasks(), fetchProjections()]);
            } catch (error) {
                console.error('Error in one or both requests:', error);
            } finally {
                setLoading(false); // Finaliza la carga cuando ambas han terminado
            }
        };
    
        if (userId) {
            fetchData(); // Llama a la función que maneja ambas solicitudes
        }
    }, [userId]);

    // Handle task form changes
    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    // Create a new task and add it to the tasks state
    const handleCreateTask = async () => {
        try {
            setIsTaskLoading(true);  // Inicia la pantalla de carga para tareas

            // Verificar si todos los campos obligatorios están llenos
            if (!newTask.title || !newTask.description || !newTask.end_date || !newTask.projection, !newTask.projection_id) {
                toast.error('Todos los campos son obligatorios.');
                return;
            }
    
            // Llamar a la API para crear la tarea
            const response = await createTask(newTask);
    
            // Verificar que haya datos en la respuesta (si la tarea fue creada)
            if (!response || !response.data) {
                throw new Error('Error creando la tarea');
            }
    
            // Añadir la nueva tarea al estado local
            setTasks([...tasks, response.data]);
    
            // Limpiar el formulario y cerrar el modal
            setNewTask({
                title: '',
                description: '',
                priority: 'Media',
                status: 'todo',
                start_date: '', // Fecha actual en formato local
                end_date: '',
                projection_id: '' // Limpiar el campo de proyección
            });
    
            setIsModalOpen(false);
            toast.success('Tarea creada con éxito');  // Mostrar toast de éxito
        } catch (error) {
            const apiErrors = error.response.data || {};
            if (error.response.status === 400) {
                const errorMessage = apiErrors.non_field_errors[0] || "Hubo un error en la solicitud. Verifica los datos ingresados.";
                toast.error(errorMessage);
            }else {
                console.error('Error creando tarea:', error);
    
                // Mostrar un toast si ocurre un error
                toast.error('Error creando la tarea. Verifica los datos.');
            }
        } finally { 
            setIsTaskLoading(false);  // Detener la pantalla de carga para tareas
        }
    };

    // Eliminar una tarea del estado local (no de la API)
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));  // Filtrar las tareas eliminando la que coincide con el id
    };

    // Actualizar una tarea en el estado local y en la API
    const handleUpdateTask = async () => {
        try {
            setIsTaskLoading(true);  // Inicia la pantalla de carga para tareas
            // Verificar si todos los campos obligatorios están llenos
            if (!taskToEdit.title || !taskToEdit.description || !taskToEdit.end_date || !taskToEdit.projection_id) {
                toast.error('Todos los campos son obligatorios.');
                return;
            }

            const response = await updateTask(taskToEdit.id, taskToEdit);
            if (response && response.data) {
                setTasks(tasks.map(task => task.id === taskToEdit.id ? response.data : task));
                toast.success('Tarea actualizada con éxito');
                closeEditModal();
            }
        } catch (error) {
            const apiErrors = error.response.data || {};
            if (error.response.status === 400) {
                const errorMessage = apiErrors.non_field_errors[0] || "Hubo un error en la solicitud. Verifica los datos ingresados.";
                toast.error(errorMessage);
            }else {
                console.error('Error creando tarea:', error);
    
                // Mostrar un toast si ocurre un error
                toast.error('Error creando la tarea. Verifica los datos.');
            }
        } finally {
            setIsTaskLoading(false);  // Detener la pantalla de carga para tareas
        }
    };

    // Update task status when dropped in a different column
    const handleDrop = async (id, newStatus) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        );
    
        // Actualizar el estado local inmediatamente para una respuesta rápida en la UI
        setTasks(updatedTasks);
    
        // Luego hacer la llamada a la API
        try {
            await updateTask(id, { status: newStatus });
            toast.success('Tarea actualizada con éxito');  // Mostrar toast para la tarea actualizada
        } catch (error) {
            console.error('Error updating task status:', error);
            setError('Error updating task status.');

            setTasks(tasks); // Revertir a las tareas originales si falla la API
        }
    };


    // TaskCard component that displays the task details
    const TaskCard = ({ task, onDelete, projections }) => {
        // Hook para arrastrar y soltar
        const [{ isDragging }, drag] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
    
        // Función que maneja la eliminación de la tarea
        const handleDelete = async (e) => {
            e.stopPropagation();  // Detener la propagación del clic para que no abra el modal de edición
            try {
                onDelete(task.id);          // Eliminarla del estado local
                await deleteTask(task.id);  // Llamar a la API para eliminar la tarea
                toast.success('Tarea eliminada con éxito');  // Mostrar toast de éxito
            } catch (error) {
                console.error('Error deleting task:', error);
                toast.error('Error eliminando la tarea');
            }
        };
    
        // Determinar el color de fondo según la prioridad
        const getPriorityColor = () => {
            switch (task.priority) {
                case 'Alta':
                    return 'bg-red-200';    // Color para alta prioridad
                case 'Media':
                    return 'bg-yellow-200'; // Color para prioridad media
                case 'Baja':
                    return 'bg-blue-200';  // Color para baja prioridad
                default:
                    return 'bg-gray-200';   // Color por defecto
            }
        };
    
        // Buscar el nombre de la proyección en base al projection_id
        const projection = projections.find(proj => proj.id === task.projection_id);
        const projectionName = projection ? projection.function : 'Sin proyección';
        const projectionActivity = projection ? projection.activity : 'Sin actividad';

        const projectionColor = projectionColors[task.projection_id] || '#f0f0f0'; // Color por defecto si no hay proyección

    
        return (
            <div
                onClick={() => openEditModal(task)}
                ref={drag}
                className={`relative p-4 mb-4 rounded-lg shadow-lg transition-all duration-300 transform ${getPriorityColor()} ${
                    isDragging 
                    ? 'opacity-50 scale-0 cursor-move' // Efecto de opacidad y escala al arrastrar
                    : 'opacity-100 scale-100 cursor-pointer' // Estado normal
                } `}
                style={{ paddingBottom: '4rem' }}  // Asegura que haya espacio para el "badge"
            >
                {/* Botón de eliminación "X" en la esquina superior derecha */}
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl"
                >
                    &times;
                </button>
    
                {/* Mostrar el nombre de la tarea */}
                <div className="font-bold text-xl mb-2 text-gray-800">{task.title}</div>
                <p className="text-sm"><strong>Prioridad:</strong> {task.priority}</p>
                <p className="text-sm"><strong>Vencimiento:</strong> {task.end_date}</p>
                <p className="text-sm mb-4"><strong>Descripción:</strong> {task.description}</p>
    
                {/* Mostrar el nombre de la actividad y la proyección en la esquina inferior derecha */}
                <div className="absolute bottom-2 right-2 bg-gray-100 text-gray-700 text-xs font-medium px-4 py-1 rounded-md shadow border border-gray-300 text-right max-w-xs break-words"
                    style={{ backgroundColor: projectionColor }} // Aplicar el color aquí
                >
                    <div>{projectionActivity}</div> {/* Nombre de la actividad */}
                    <div className="text-gray-600 italic">{projectionName}</div> {/* Nombre de la proyección */}
                </div>
            </div>
        );
    };
    
    const openEditModal = (task) => {
        // Obtener la fecha actual y restar un día
        const today = new Date();
        today.setDate(today.getDate());
    
        // Formatear la fecha en "YYYY-MM-DD"
        const formattedDate = today.toISOString().split('T')[0];
    
        // Abrir el modal y establecer la fecha actual como la fecha de inicio
        setTaskToEdit({
            ...task,
            start_date: formattedDate, // Setear la fecha actual restada un día
        });
                
        setIsEditModalOpen(true);
    };
    
    const closeEditModal = () => {
        setTaskToEdit(null);
        setIsEditModalOpen(false);
    };
    

    // Column component that holds the tasks for each status
    const Column = ({ status, children }) => {
        // Hook para arrastrar y soltar
        const [{ isOver }, drop] = useDrop({
            accept: 'task',
            drop: (draggedItem) => {
                if (draggedItem.status !== status) {
                    handleDrop(draggedItem.id, status);
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        });
    
        return (
            <div
                ref={drop}
                className={`w-1/3 p-4 rounded-lg shadow-md transition-all duration-300 transform ${
                    isOver
                        ? 'bg-blue-300 scale-105'  // Efecto cuando una tarea está sobre la columna
                        : 'bg-gray-100 scale-100'  // Estado normal
                }`}
            >
                <h2 className="text-2xl font-bold text-center mb-4">{status.toUpperCase()}</h2>
                <div>{children}</div>
            </div>
        );
    };

    // Modal toggles (Abrir y cerrar el modal)
    const openModal = () => {
        // Obtener la fecha actual y restar un día
        const today = new Date();
        today.setDate(today.getDate());
    
        // Formatear la fecha en "YYYY-MM-DD"
        const formattedDate = today.toISOString().split('T')[0];
    
        // Abrir el modal y establecer la fecha actual como la fecha de inicio
        setNewTask({
            ...newTask,
            start_date: formattedDate, // Setear la fecha actual restada un día
        });
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // // Show loading screen when tasks are being created or edited
    // if (isTaskLoading) {
    //     return <lo />;  // Pantalla de carga específica para creación/edición de tareas
    // }

    // Show loading (Mostrar pantalla de carga)
    if (loading) {
        return <LoadingAnimation />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <main className="min-h-screen bg-cover bg-center">
            {/* navegación fija */}
            <Navigation />

            <hr className="border-t-2 border-black my-4" />
            
            <Toaster /> {/* Añade el contenedor de toast */}
            <div className="container mx-auto p-8">
                <DndProvider backend={HTML5Backend}>
                    <div className="flex justify-between gap-x-6 p-6 bg-gray-800 rounded-lg shadow-md">
                        <Column status="todo">
                            {tasks.filter(task => task.status === 'todo').map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} projections={projections} />
                            ))}
                        </Column>
                        <Column status="in-progress">
                            {tasks.filter(task => task.status === 'in-progress').map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} projections={projections} />
                            ))}
                        </Column>
                        <Column status="done">
                            {tasks.filter(task => task.status === 'done').map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} projections={projections} />
                            ))}
                        </Column>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={openModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Crear Nueva Tarea
                        </button>
                    </div>

                    {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Nueva Tarea</h3>
                                    
                            {/* Campo del título */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la tarea</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleTaskChange}
                                    placeholder="Escribe el título"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                                    
                            {/* Campo de la descripción */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    name="description"
                                    value={newTask.description}
                                    onChange={handleTaskChange}
                                    placeholder="Escribe la descripción"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                                />
                            </div>
                            
                            {/* Campo de fecha de vencimiento */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Vencimiento</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={newTask.end_date}
                                    onChange={handleTaskChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                                    
                            {/* Selector de prioridad */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Prioridad</label>
                                <select
                                    name="priority"
                                    value={newTask.priority}
                                    onChange={handleTaskChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>

                            {/* Selector de proyección */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Proyección</label>
                                <select
                                    name="projection_id"
                                    value={newTask.projection_id}
                                    onChange={(e) => setNewTask({ ...newTask, projection_id: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Selecciona una proyección</option>
                                    {projections.map(projection => (
                                        <option key={projection.id} value={projection.id}>
                                            {projection.function}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                                    
                            {/* Botones para cancelar o crear */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateTask}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Tarea</h3>
                            
                            {/* Campo de título */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la tarea</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={taskToEdit?.title || ''}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            
                            {/* Campo de descripción */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    name="description"
                                    value={taskToEdit?.description || ''}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            
                            {/* Campo de fecha de vencimiento */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Vencimiento</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={taskToEdit?.end_date || ''}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, end_date: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* Selector de prioridad */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Prioridad</label>
                                <select
                                    name="priority"
                                    value={taskToEdit?.priority || ''}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, priority: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>

                            {/* Selector de proyección */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Proyección</label>
                                <select
                                    name="projection_id"
                                    value={taskToEdit?.projection_id || ''}
                                    onChange={(e) => setTaskToEdit({ ...taskToEdit, projection_id: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">Selecciona una proyección</option>
                                    {projections.map(projection => (
                                        <option key={projection.id} value={projection.id}>
                                            {projection.function}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex justify-end space-x-4">
                                <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
                                <button onClick={handleUpdateTask} className="bg-green-500 text-white px-4 py-2 rounded-lg">Actualizar</button>
                            </div>
                        </div>
                    </div>
                )}
                    {isTaskLoading && <LoadingSpinner />}  {/* Mostrar spinner discreto si hay carga */}

                </DndProvider>
            </div>
        </main>
    );
}

export default KanbanBoard;
