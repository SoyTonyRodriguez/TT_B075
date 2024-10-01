import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createTask, getTasks, updateTaskStatus, deleteTask } from "../../../api/tasks.api";
import LoadingAnimation from "../components/LoadingAnimation";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from 'react-hot-toast';
import Navigation from './Navigation/Navigation'; 

function KanbanBoard() {
    // Get Tasks from the API
    const [tasks, setTasks] = useState([]);

    // Get user ID from the token
    const [userId, setUserId] = useState(null);

    // Loading state (Pantalla de carga XD)
    const [loading, setLoading] = useState(true);
    
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
                // Call the API to get the tasks
                const response = await getTasks(userId);

                // Set the tasks state with the response data (Lista de tareas)
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Error fetching tasks.');
            } finally {
                setLoading(false); // Always stop loading after fetching
            }
        };

        // if userId is set, fetch the tasks
        if (userId) {
            fetchTasks();
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
            // Call the API to create the task
            const response = await createTask(newTask);

            // Add the new task to the tasks state
            setTasks([...tasks, response.data]);
            setNewTask({
                title: '',
                description: '',
                priority: 'Media',
                status: 'todo',
                start_date: '',
                end_date: ''
            });

            // Close the modal (Ocultar el formulario XD)
            setIsModalOpen(false);
            toast.success('Tarea creada con éxito');  // Mostrar toast para la tarea creada
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Error creating task.');
        }
    };

    // Eliminar una tarea del estado local (no de la API)
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));  // Filtrar las tareas eliminando la que coincide con el id
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
            await updateTaskStatus(id, { status: newStatus });
            toast.success('Tarea actualizada con éxito');  // Mostrar toast para la tarea actualizada
        } catch (error) {
            console.error('Error updating task status:', error);
            setError('Error updating task status.');

            setTasks(tasks); // Revertir a las tareas originales si falla la API
        }
    };

    // Calculate duration between start and end date
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationInMs = Math.abs(end - start);
        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
        return durationInDays;
    };

    // TaskCard component that displays the task details
    const TaskCard = ({ task, onDelete }) => {
        // Hook para arrastrar y soltar
        const [{ isDragging }, drag] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
    
        // Función que maneja la eliminación de la tarea
        const handleDelete = async () => {
            try {
                onDelete(task.id);          // Eliminarla del estado local
                await deleteTask(task.id);  // Llamar a la API para eliminar la tarea
                toast.success('Tarea eliminada con éxito');  // Mostrar toast de éxito
            } catch (error) {
                console.error('Error deleting task:', error);
                toast.error('Error eliminando la tarea');
            }
        };
    
        return (
            <div
                ref={drag}
                className={`relative bg-white p-4 mb-4 rounded-lg shadow-md transition-all duration-300 transform ${
                    isDragging 
                    ? 'opacity-50 scale-0' // Efecto de opacidad y escala al arrastrar
                    : 'opacity-100 scale-100' // Estado normal
                }`}
            >
                {/* Botón de eliminación "X" en la esquina superior derecha */}
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-3xl"
                    >
                    &times;
                </button>
    
                <div className="font-bold text-lg mb-2">{task.title}</div>
                <p><strong>Duración:</strong> {calculateDuration(task.start_date, task.end_date)} días</p>
                <p><strong>Prioridad:</strong> {task.priority}</p>
                <p><strong>Vencimiento:</strong> {task.end_date}</p>
                <p><strong>Descripción:</strong> {task.description}</p>
            </div>
        );
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
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                            ))}
                        </Column>
                        <Column status="in-progress">
                            {tasks.filter(task => task.status === 'in-progress').map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                            ))}
                        </Column>
                        <Column status="done">
                            {tasks.filter(task => task.status === 'done').map(task => (
                                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
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
                            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                <h3 className="text-lg font-bold mb-4">Crear Nueva Tarea</h3>
                                <input
                                    type="text"
                                    name="title"
                                    value={newTask.title}
                                    onChange={handleTaskChange}
                                    placeholder="Título de la tarea"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />
                                <textarea
                                    name="description"
                                    value={newTask.description}
                                    onChange={handleTaskChange}
                                    placeholder="Descripción"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />
                                <input
                                    type="date"
                                    name="start_date"
                                    value={newTask.start_date}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />
                                <input
                                    type="date"
                                    name="end_date"
                                    value={newTask.end_date}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                />
                                <select
                                    name="priority"
                                    value={newTask.priority}
                                    onChange={handleTaskChange}
                                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                                <div className="flex justify-between">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleCreateTask}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </DndProvider>
            </div>
        </main>
    );
}

export default KanbanBoard;
