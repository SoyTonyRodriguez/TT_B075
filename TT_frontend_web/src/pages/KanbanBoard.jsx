import React, { useState, useEffect } from 'react';
import axios from 'axios';

function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'todo',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
       // fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/v1/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateTask = async () => {
        try {
            const response = await axios.post('/api/v1/task/register/', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({
                title: '',
                description: '',
                status: 'todo',
                start_date: '',
                end_date: ''
            });
        } catch (error) {
            console.error('Error creating task:', error.response.data);
        }
    };

    const renderTasks = (status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (
                <div key={task.id} className="task-card" style={{ padding: '10px', margin: '5px 0', backgroundColor: '#fff', border: '1px solid #ddd' }}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            ));
    };

    return (
        <div>
            <div className="kanban-board flex" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className="column" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px', backgroundColor: '#f4f4f4' }}>
                    <h2>TO DO</h2>
                    {renderTasks('todo')}
                </div>
                <div className="column" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px', backgroundColor: '#f4f4f4' }}>
                    <h2>IN PROGRESS</h2>
                    {renderTasks('in-progress')}
                </div>
                <div className="column" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', width: '300px', backgroundColor: '#f4f4f4' }}>
                    <h2>DONE</h2>
                    {renderTasks('done')}
                </div>
            </div>
            <div className="new-task-form" style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', width: '300px' }}>
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
                <button
                    onClick={handleCreateTask}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                >
                    Create Task
                </button>
            </div>
        </div>
    );
}

export default KanbanBoard;
