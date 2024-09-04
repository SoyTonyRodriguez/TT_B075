import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createTask, getTasks, updateTaskStatus } from "../api/tasks.api";  // Ensure you have the updateTaskStatus API

function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
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
                setUserId(decodedToken.user_id);  // Decode the token to get user ID
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
                    setTasks(response.data);  // Assuming API returns tasks associated with the user
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

    const TaskCard = ({ task }) => {
        const [, drag] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status }
        });

        return (
            <div ref={drag} className="task-card" style={{ padding: '10px', margin: '5px 0', backgroundColor: '#fff', border: '1px solid #ddd' }}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
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
            <div ref={drop} className="column" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px', backgroundColor: '#f4f4f4' }}>
                <h2>{status.toUpperCase()}</h2>
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
            <div className="kanban-board flex" style={{ display: 'flex', justifyContent: 'space-around' }}>
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
            <div className="new-task-form" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', width: '350px' }}>
                <h3>Create a New Task</h3>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleTaskChange}
                    placeholder="Task Title"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd' }}
                />
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleTaskChange}
                    placeholder="Task Description"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd' }}
                />
                <input
                    type="date"
                    name="start_date"
                    value={newTask.start_date}
                    onChange={handleTaskChange}
                    placeholder="Start Date"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd' }}
                />
                <input
                    type="date"
                    name="end_date"
                    value={newTask.end_date}
                    onChange={handleTaskChange}
                    placeholder="End Date"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ddd' }}
                />
                <button onClick={handleCreateTask} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
                    Create Task
                </button>
            </div>
        </DndProvider>
    );
}

export default KanbanBoard;
