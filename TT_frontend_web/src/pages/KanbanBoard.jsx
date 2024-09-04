import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import { createTask, getTasks } from "../api/tasks.api";

function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'todo',  // Default status is 'todo'
        start_date: '',
        end_date: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id); // Assuming the token has an 'id' field
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
                    setTasks(response.data); // Assuming the API response has a 'name' field
                } catch (error) {
                    console.error('Error fetching tasks, details:', error);
                    if (error.response && error.response.status === 401) {
                        console.error('Unauthorized: Invalid or expired token');
                    }
                } finally {
                    setLoading(false)
                }
            };
            fetchTasks();
        }
    }, [userId]);

    if (loading) {
        // Show a loading spinner or any placeholder until the data is fetched
        return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className="text-center mt-16 w-full h-full text-white text-3xl">Cargando...</div>
        </div>
        );
    }

    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateTask = async () => {
        try {
            const response = await createTask(newTask);
            //const response = await axios.post('http://localhost:8000/api/v1/task/register/', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({
                title: '',
                description: '',
                status: 'todo',
                start_date: '',
                end_date: ''
            });  // Reset the form
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const Column = ({ status }) => (
        <div className="column" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px', backgroundColor: '#f4f4f4' }}>
            <h2>{status.toUpperCase()}</h2>
            <div className="task-list">
                {tasks.filter(task => task.status === status).map(task => (
                    <div key={task.id} className="task-card" style={{ padding: '10px', margin: '5px 0', backgroundColor: '#fff', border: '1px solid #ddd' }}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <div className="kanban-board flex" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Column status="todo" />
                <Column status="in-progress" />
                <Column status="done" />
            </div>
            <div className="new-task-form" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>
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
        </div>
    );
}

export default KanbanBoard;
