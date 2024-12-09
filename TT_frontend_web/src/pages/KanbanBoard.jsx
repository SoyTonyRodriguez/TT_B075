import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createTask, getTasks, updateTask, deleteTask } from "../api/tasks.api";
import { getProduct, updateProduct, deleteProduct } from '../api/products.api';
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'react-hot-toast';
import Navigation from './Navigation/Navigation'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { IoTime } from "react-icons/io5";
import { TbXboxXFilled } from "react-icons/tb";
import { AiOutlinePaperClip } from 'react-icons/ai'; 
import { get_Check_Products } from '../api/check_products.api';
import { Link } from 'react-router-dom';

function KanbanBoard() {
    // -_-_-_-_-_-_-_-_-_-  States  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-
    const [tasks, setTasks] = useState([]);         // Get Tasks from the API
    const [userId, setUserId] = useState(null);     // Get user ID from the token
    const [loading, setLoading] = useState(true);   // Loading state (Pantalla de carga XD)
    const [isTaskLoading, setIsTaskLoading] = useState(false);  // Pantalla de carga para tareas (crear/editar)
    const [projections, setProjections] = useState([]);  // Estado para guardar las proyecciones traídas de la API
    const [newTask, setNewTask] = useState({             // Estado para guardar los datos de la nueva tarea
        title: '',
        description: '',
        priority: '',
        status: 'todo',
    });
    const [error, setError] = useState(null);   // Error state
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state, to show or hide the task creation form
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [expandedProjectionId, setExpandedProjectionId] = useState(null);  // Estado para saber qué proyección está expandida
    const [cache, setCache] = useState({ tasks: null, projections: null });

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

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (!cache.tasks || !cache.projections) {
                const [tasksResponse, projectionsResponse] = await Promise.all([
                    getTasks(userId),
                    getProduct(userId)
                ]);

                const fetchedTasks = tasksResponse.data;
                const fetchedProjections = projectionsResponse.data;

                setTasks(fetchedTasks);
                setProjections(fetchedProjections);
                setCache({ tasks: fetchedTasks, projections: fetchedProjections });
            } else {
                setTasks(cache.tasks);
                setProjections(cache.projections);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data.');
        } finally {
            setLoading(false);
        }
    }, [userId, cache.tasks, cache.projections]);

    const handleDeleteProduct = async (productid) => {
        try {
            setLoading(true);
            await deleteProduct(productid);
    
            // Actualiza los estados
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks.filter(task => task.projection_id !== productid);
                return updatedTasks;
            });

            setProjections((prevProjections) => {
                const updatedProjections = prevProjections.filter(proj => proj.id !== productid);
                return updatedProjections;
            });
    
            // Actualiza los datos de Check Products
            const responseProductCheck = await get_Check_Products(userId);
            const accountDetails = JSON.parse(localStorage.getItem('accountDetails')) || {};
            if (responseProductCheck.data.total_up === 0) {
                accountDetails.units_projection = '0';
            } else {
                accountDetails.units_projection = responseProductCheck.data.total_up;
            }            
            localStorage.setItem('accountDetails', JSON.stringify(accountDetails));

            toast.success('Producto y tareas eliminadas con éxito');
        } catch (error) {
            console.error('Error eliminando proyección:', error);
            toast.error('Error al eliminar la proyección y sus tareas asociadas.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId, fetchData]);

    // Handle task form changes
    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    // ---- FUNCION OPTIMIZADA ----
    // Ahora NO llama a getProduct nuevamente, solo actualiza la proyección localmente.
    const updateProjectionProgress = async (projectionId, currentTasks) => {
        const progress = calculateProgress(currentTasks, projectionId);

        const projection = projections.find(proj => proj.id === projectionId);
        const projectionDocuments = Array.isArray(projection.documents_uploaded)
            ? projection.documents_uploaded
            : safeParseJSON(projection.documents_uploaded || '[]');

        const documentsUploadedCount = projectionDocuments.length;
        const documentsRequiredCount = projection.documents_number || 0;

        if (progress === 100 && documentsUploadedCount < documentsRequiredCount) {
            toast.error('No puedes completar esta proyección sin subir todos los documentos requeridos.');
            return;
        }

        try {
            await updateProduct(projectionId, { progress });

            // Actualizar el estado local sin llamar a la API nuevamente
            setProjections(prevProjections =>
                prevProjections.map(proj => 
                    proj.id === projectionId
                        ? { ...proj, progress }
                        : proj
                )
            );

            console.log(`Progreso actualizado para la proyección ${projectionId}: ${progress}%`);
        } catch (error) {
            console.error('Error actualizando el progreso:', error);
            toast.error('Error actualizando el progreso de la proyección.');
        }
    };

    const handleCreateTask = useCallback(async () => {
        if (!newTask.title  || !newTask.projection_id || !newTask.priority) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        try {
            setIsTaskLoading(true);
            const response = await createTask(newTask);

            if (response && response.data) {
                const createdTask = response.data;
                const updatedTasks = [...tasks, createdTask];

                setTasks(updatedTasks);
                setCache({ ...cache, tasks: updatedTasks });

                if (createdTask.projection_id) {
                    await updateProjectionProgress(createdTask.projection_id, updatedTasks);
                }

                setNewTask({ title: '', description: '', priority: 'Media', status: 'todo', projection_id: '' });
                setIsModalOpen(false);
                toast.success('Tarea creada con éxito');
            }
        } catch (error) {
            console.error('Error creando tarea:', error);
            toast.error('Error creando la tarea. Verifica los datos.');
        } finally {
            setIsTaskLoading(false);
        }
    }, [newTask, tasks, cache]);

    // Eliminar una tarea del estado local (no de la API)
    const handleDeleteTask = async (id) => {
        const taskToDelete = tasks.find(task => task.id === id);
    
        try {
            // Eliminar la tarea del estado local
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
    
            // Llamar a la API para eliminar la tarea
            await deleteTask(id);
            toast.success('Tarea eliminada con éxito');
    
            // Si la tarea pertenece a una proyección, recalcular el progreso
            if (taskToDelete.projection_id) {
                await updateProjectionProgress(taskToDelete.projection_id, updatedTasks);
            }
    
        } catch (error) {
            console.error('Error eliminando tarea:', error);
            toast.error('Error eliminando la tarea');
        }
    };

    // Actualizar una tarea en el estado local y en la API
    const handleUpdateTask = async () => {
        try {
            setIsTaskLoading(true);
    
            // Llamada a la API para actualizar la tarea
            const response = await updateTask(taskToEdit.id, taskToEdit);
            
            if (response && response.data) {
                const updatedTask = response.data;
                const updatedTasks = tasks.map(task => 
                    task.id === taskToEdit.id ? updatedTask : task
                );

                setTasks(updatedTasks);

                if (updatedTask.projection_id) {
                    await updateProjectionProgress(updatedTask.projection_id, updatedTasks);
                }

                toast.success('Tarea actualizada con éxito');
                closeEditModal();
            }
        } catch (error) {
            console.error('Error actualizando la tarea:', error);
            toast.error('Error actualizando la tarea.');
        } finally {
            setIsTaskLoading(false);
        }
    };

    // Función para calcular el progreso basado en las tareas completadas
    const calculateProgress = (tasks, projectionId) => {
        const projectionTasks = tasks.filter(task => task.projection_id === projectionId);
        const doneTasks = projectionTasks.filter(task => task.status === 'done');
    
        if (projectionTasks.length === 0) return 0;
    
        let progress = (doneTasks.length / projectionTasks.length) * 100;
    
        // Obtener la proyección correspondiente
        const projection = projections.find(proj => proj.id === projectionId);
    
        const projectionDocuments = Array.isArray(projection.documents_uploaded)
            ? projection.documents_uploaded
            : safeParseJSON(projection.documents_uploaded || '[]');
    
        const documentsUploadedCount = projectionDocuments.length;
        const documentsRequiredCount = projection.documents_number || 0;
    
        if (documentsUploadedCount < documentsRequiredCount) {
            progress = Math.min(progress, 99);
        }
    
        return Math.round(progress);
    };

    const safeParseJSON = (str) => {
        try {
            const cleanedStr = str.replace(/'/g, '"').trim();
            return JSON.parse(cleanedStr);  
        } catch (error) {
            console.error('Error al parsear JSON:', error);
            return [];
        }
    };
    

    // Update task status when dropped in a different column
    const handleDrop = async (id, newStatus) => {
        const taskBeforeUpdate = tasks.find(task => task.id === id);
        
        // Si el estado no ha cambiado, no hacemos nada.
        if (taskBeforeUpdate.status === newStatus) return;

    
        // Actualizamos las tareas en el estado temporalmente
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        );
    
        setTasks(updatedTasks); // Actualiza el estado con el cambio temporal
    
        const updatedTask = updatedTasks.find(task => task.id === id);

        if (updatedTask.projection_id) {
            const projection = projections.find(proj => proj.id === updatedTask.projection_id);
    
            // Filtramos todas las tareas asociadas a esta proyección
            const projectionTasks = updatedTasks.filter(task => task.projection_id === updatedTask.projection_id);
            const remainingTasks = projectionTasks.filter(task => task.status !== 'done');

            const projectionDocuments = Array.isArray(projection.documents_uploaded)
                ? projection.documents_uploaded
                : safeParseJSON(projection.documents_uploaded || '[]');

            const documentsUploadedCount = projectionDocuments.length;
            const documentsRequiredCount = projection.documents_number || 0;
    
    
            console.log(`Restan ${remainingTasks.length} tareas. Documentos: ${documentsUploadedCount}/${documentsRequiredCount}`);
    
            // **Nueva validación**: Solo si NO hay más tareas restantes y faltan documentos

            console.log(`Restan ${remainingTasks.length} tareas. Documentos: ${documentsUploadedCount}/${documentsRequiredCount}`);
    
            // **Nueva validación**: Solo si NO hay más tareas restantes y faltan documentos
            if (newStatus === 'done' && remainingTasks.length === 0 && documentsUploadedCount < documentsRequiredCount) {
                toast.error('No puedes completar esta actividad sin subir todos los documentos requeridos.');
                setTasks(tasks); 
                return;
            }
            
            // Calculamos el progreso localmente
            const localProgress = calculateProgress(updatedTasks, updatedTask.projection_id);
    
            // Actualizamos el progreso en el estado local
            setProjections(prevProjections =>
                prevProjections.map(projection =>
                    projection.id === updatedTask.projection_id
                        ? { ...projection, progress: localProgress }
                        : projection
                )
            );
        }

        try {
            await updateTask(id, { status: newStatus });
            if (taskBeforeUpdate.projection_id) {
                await updateProjectionProgress(taskBeforeUpdate.projection_id, updatedTasks);
            }
            toast.success('Tarea actualizada con éxito');
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Error actualizando la tarea.');
            setTasks(tasks);
        }
    };
    
    

    // TaskCard component that displays the task details
    const TaskCard = ({ task, onDelete, projections }) => {
        const [{ isDragging }, drag] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
    
        // Función que maneja la eliminación de la tarea
        const handleDelete = async (e) => {
            e.stopPropagation();
            onDelete(task.id);
        };
    
    
        // Determinar el color de fondo según la prioridad

        // Determinar el color de fondo según la prioridad
        const getPriorityColor = () => {
            switch (task.priority) {
                case 'Alta':
                    return 'bg-red-200';
                case 'Media':
                    return 'bg-yellow-200';
                case 'Baja':
                    return 'bg-blue-200';
                default:
                    return 'bg-gray-200';
            }
        };
    
    
        // Buscar el nombre de la proyección en base al projection_id

        // Buscar el nombre de la proyección en base al projection_id
        const projection = projections.find(proj => proj.id === task.projection_id);
        const projectionName = projection ? projection.function : 'Sin proyección';
        const projectionActivity = projection ? projection.activity : 'Sin actividad';
        const projectionColor =  projection ? projection.color : '#f0f0f0';

        return (
            <div
                onClick={() => openEditModal(task)}
                ref={drag}
                className={`relative p-3 mb-2 rounded-lg shadow-md transition-all duration-300 transform ${getPriorityColor()} ${
                    isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                } hover:shadow-lg cursor-pointer`}
                style={{ minHeight: '100px', paddingBottom: '3rem' }}
            >
                <div 
                    className="absolute top-1 -right-1 text-red-500 hover:text-red-700 text-sm"
                    onClick={handleDelete} 
                >
                    <TbXboxXFilled className="mr-2" />
                </div>
    
                <div className="font-bold text-md mb-1 text-gray-800 truncate z-10">{task.title}</div>
                <div className="absolute top-8 right-2 flex items-center text-gray-600 text-xs font-medium">
                    <IoTime className="mr-2" />
                    {task.end_date}
                </div>
                <div
                    className="absolute bottom-2 left-2 right-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-md shadow-sm border border-gray-300 text-right break-words overflow-hidden"
                    style={{ backgroundColor: projectionColor }}
                >
                    <div className="truncate">{projectionActivity}</div>
                    <div className="text-gray-600 italic truncate">{projectionName}</div>
                </div>
            </div>
        );
    };
    
    const openEditModal = (task) => {     
        setTaskToEdit(task);  
        setIsEditModalOpen(true);
    };
    
    const closeEditModal = () => {
        setTaskToEdit(null);
        setIsEditModalOpen(false);
    };

    const STATUS_LABELS = {
        'todo': 'Por Hacer',
        'in-progress': 'En Progreso',
        'done': 'Hecho',
    };

    const Column = ({ status, children }) => {
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
                    isOver ? 'bg-blue-300 scale-105' : 'bg-gray-100 scale-100'
                }`}
                style={{ height: '650px', overflowY: 'auto' }}
            >
                <h2 className="text-2xl font-bold text-center mb-4">
                    {STATUS_LABELS[status].toUpperCase()}
                </h2>
                <div>{children}</div>
            </div>
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    const ProgressBar = ({ progress }) => (
        <div className="w-full bg-gray-200 rounded-full h-2 relative mt-1">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          >
          </div>
        </div>
    );

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
                {/* Contenedor flex que envuelve las columnas y el panel lateral */}
                <div className="flex justify-between gap-x-6 p-6 bg-gray-800 rounded-lg shadow-md" style={{ height: '700px', overflow: 'hidden' }}>
                    
                    {/* Columna de Tareas */}
                    <div className="flex-1 flex gap-x-6">
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
                    
                    {/* Panel lateral derecho con proyecciones y su progreso */}
                    <div className="w-1/3 p-6 bg-gray-100 shadow-lg rounded-lg" style={{ height: '650px', overflowY: 'auto' }}>
                        <h2 className="text-2xl font-bold mb-2">Progresos de actividades</h2>
                        <div className="space-y-4">
                            {projections.map((projection) => {
                                const projectionTasks = tasks.filter(task => task.projection_id === projection.id);
                                const doneTasks = projectionTasks.filter(task => task.status === 'done').length;
                                const totalTasks = projectionTasks.length;

                                const projectionDocuments = Array.isArray(projection.documents_uploaded) 
                                    ? projection.documents_uploaded 
                                    : safeParseJSON(projection.documents_uploaded || '[]');

                                const documentsUploadedCount = projectionDocuments.length;
                                const documentsRequiredCount = projection.documents_number || 0;

                                const isExpanded = expandedProjectionId === projection.id;  // Saber si esta proyección está expandida

                                return (
                                    <div 
                                        key={projection.id} 
                                        className="relative shadow-md p-4 hover:shadow-lg transition-all duration-300 border mb-4 flex flex-col gap-2" 
                                        style={{ 
                                            borderColor: projection.color || '#cccccc',
                                            borderWidth: '2px',
                                            borderRadius: '8px',
                                            boxShadow: `0 2px 6px ${projection.color}22`, 
                                        }}
                                    >
                                        {/* Botón de eliminación en la esquina superior derecha */}
                                        <div 
                                            className="absolute top-1 right-1 text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDeleteProduct(projection.id)}
                                        >
                                            <TbXboxXFilled size={20} title="Eliminar Proyección" />
                                        </div>
                                        
                                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                                            {projection.activity}
                                        </h3>

                                        <span className="text-xs text-gray-500 mb-2">
                                            {doneTasks}/{totalTasks} Tareas completadas
                                        </span>

                                        <ProgressBar progress={projection.progress || 0} />

                                        {/* Botón de toggle para mostrar/ocultar documentos */}
                                        <button 
                                            onClick={() => setExpandedProjectionId(isExpanded ? null : projection.id)}
                                            className="text-blue-500 text-xs mt-2 hover:underline"
                                        >
                                            {isExpanded ? 'Ocultar documentos' : 'Mostrar documentos'}
                                        </button>

                                        {/* Lista de documentos */}
                                        {isExpanded && (
                                            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                                                {projection.documents_required.split('\n').map((doc, index) => (
                                                    <li key={index}>{doc.trim()}</li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="text-xs text-gray-600 flex items-center gap-2">
                                            <AiOutlinePaperClip className="text-blue-400" size={16} />
                                            <span>{documentsUploadedCount}/{documentsRequiredCount} documentos</span>
                                        </div>

                                        {documentsUploadedCount < documentsRequiredCount && (
                                            <Link 
                                                to="/documents" 
                                                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                            >
                                                <AiOutlinePaperClip size={16} />
                                                Subir documento
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Botón para crear una nueva tarea */}
                <div className="mt-8">
                    <button
                        onClick={openModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                    Crear nueva tarea
                    </button>
                </div>
                </DndProvider>

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Crear nueva tarea
                        </h3>

                        {/* Campo del título */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Título de la tarea
                            </label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descripción (Opcional)
                            </label>
                            <textarea
                            name="description"
                            value={newTask.description}
                            onChange={handleTaskChange}
                            placeholder="Escribe la descripción"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* Selector de prioridad */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Prioridad
                            </label>
                            <select
                            name="priority"
                            value={newTask.priority || ''}
                            onChange={(e) => {
                                handleTaskChange(e);
                            }}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                newTask.priority === 'Alta'
                                ? 'bg-red-500 text-white'
                                : newTask.priority === 'Media'
                                ? 'bg-yellow-500 text-white'
                                : newTask.priority === 'Baja'
                                ? 'bg-blue-500 text-white'
                                : ''
                            }`}
                            >
                            <option value="" disabled>
                                Seleccione una prioridad
                            </option>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                            </select>
                        </div>

                        {/* Selector de proyección */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Proyección
                            </label>
                            <select
                            name="projection_id"
                            value={newTask.projection_id || ''}
                            onChange={(e) =>
                                setNewTask({ ...newTask, projection_id: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                            <option value="">Selecciona una proyección</option>
                            {projections.map((projection) => (
                                <option key={projection.id} value={projection.id}>
                                {projection.activity}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Editar tarea
                    </h3>

                    {/* Campo de título */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Título de la tarea
                        </label>
                        <input
                        type="text"
                        name="title"
                        value={taskToEdit?.title || ''}
                        onChange={(e) =>
                            setTaskToEdit({ ...taskToEdit, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Campo de descripción */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descripción (Opcional)
                        </label>
                        <textarea
                        name="description"
                        value={taskToEdit?.description || ''}
                        onChange={(e) =>
                            setTaskToEdit({ ...taskToEdit, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Selector de prioridad */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prioridad
                        </label>
                        <select
                        name="priority"
                        value={taskToEdit?.priority || ''}
                        onChange={(e) => {
                            setTaskToEdit({ ...taskToEdit, priority: e.target.value });
                        }}
                        className={`w-full px-4 py-2 border rounded-lg ${
                            taskToEdit?.priority === 'Alta'
                            ? 'bg-red-500 text-white'
                            : taskToEdit?.priority === 'Media'
                            ? 'bg-yellow-500 text-white'
                            : taskToEdit?.priority === 'Baja'
                            ? 'bg-blue-500 text-white'
                            : ''
                        }`}
                        >
                        <option value="">Selecciona una prioridad</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                        </select>
                    </div>

                    {/* Selector de proyección */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Proyección
                        </label>
                        <select
                        name="projection_id"
                        value={taskToEdit?.projection_id || ''}
                        onChange={(e) =>
                            setTaskToEdit({ ...taskToEdit, projection_id: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                        <option value="" disabled>
                            Selecciona una proyección
                        </option>
                        {projections.map((projection) => (
                            <option key={projection.id} value={projection.id}>
                            {projection.activity}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                        onClick={closeEditModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                        Cancelar
                        </button>
                        <button
                        onClick={handleUpdateTask}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                        Actualizar
                        </button>
                    </div>
                    </div>
                </div>
                )}

                {isTaskLoading && <LoadingSpinner />}
            </div>
        </main>
    );
}

export default KanbanBoard;