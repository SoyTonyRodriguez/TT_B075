import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createTask, getTasks, updateTaskStatus } from "../api/tasks.api";

function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'Media',  // Default priority
        status: 'todo',  // Default status
        start_date: '',
        end_date: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchTasks = async () => {
                try {
                    const response = await getTasks(userId);
                    setTasks(response.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTasks();
        }
    }, [userId]);

    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateTask = async () => {
        try {
            const response = await createTask(newTask);
            setTasks([...tasks, response.data]);
            setNewTask({
                title: '',
                description: '',
                priority: 'Media',
                status: 'todo',
                start_date: '',
                end_date: ''
            });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDrop = async (id, newStatus) => {
        try {
            await updateTaskStatus(id, { status: newStatus });
            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const durationInMs = Math.abs(end - start);
        const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
        return durationInDays;
    };

    const TaskCard = ({ task }) => {
        const [, drag] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status }
        });
    
        return (
            <div ref={drag} className="task-card" style={taskCardStyle}>
                <div className="task-header">
                    <h3 style={taskTitleStyle}>{task.title}</h3> {/* Title with updated style */}
                </div>
                <div className="task-body">
                    <p><strong>Duración:</strong> {calculateDuration(task.start_date, task.end_date)} días</p>
                    <p><strong>Prioridad:</strong> {task.priority}</p>
                    <p><strong>Vencimiento:</strong> {task.end_date}</p>
                </div>
                <div className="task-footer">
                    <p><strong>Descripción:</strong> {task.description}</p>
                </div>
            </div>
        );
    };

    const Column = ({ status, children }) => {
        const [, drop] = useDrop({
            accept: 'task',
            drop: (draggedItem) => {
                if (draggedItem.status !== status) {
                    handleDrop(draggedItem.id, status);
                }
            },
        });

        return (
            <div ref={drop} className="column" style={columnStyle}>
                <h2 style={columnHeaderStyle}>{status.toUpperCase()}</h2>
                <div className="task-list">{children}</div>
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board" style={kanbanBoardStyle}>
                <Column status="todo">
                    {tasks.filter(task => task.status === 'todo').map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Column>
                <Column status="in-progress">
                    {tasks.filter(task => task.status === 'in-progress').map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Column>
                <Column status="done">
                    {tasks.filter(task => task.status === 'done').map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Column>
            </div>
            <div className="new-task-form" style={newTaskFormStyle}>
                <h3>Create a New Task</h3>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleTaskChange}
                    placeholder="Task Title"
                    style={inputStyle}
                />
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleTaskChange}
                    placeholder="Task Description"
                    style={inputStyle}
                />
                <input
                    type="date"
                    name="start_date"
                    value={newTask.start_date}
                    onChange={handleTaskChange}
                    placeholder="Start Date"
                    style={inputStyle}
                />
                <input
                    type="date"
                    name="end_date"
                    value={newTask.end_date}
                    onChange={handleTaskChange}
                    placeholder="End Date"
                    style={inputStyle}
                />
                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleTaskChange}
                    style={inputStyle}
                >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <button onClick={handleCreateTask} style={createButtonStyle}>
                    Create Task
                </button>
            </div>
        </DndProvider>
    );
}

export default KanbanBoard;

// CSS styles for columns, task cards, and form

const kanbanBoardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#262626',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const columnStyle = {
    width: '30%',
    backgroundColor: '#edebeb',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const columnHeaderStyle = {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
};

const taskTitleStyle = {
    fontSize: '22px',   // Increase the font size
    fontWeight: 'bold', // Make it bold
    marginBottom: '10px', // Add some margin to space it out from the other elements
    color: '#333', // You can adjust the color as well if needed
};

const taskCardStyle = {
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const newTaskFormStyle = {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '350px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
};

const createButtonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};
