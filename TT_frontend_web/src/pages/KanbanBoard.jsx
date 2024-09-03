import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function KanbanBoard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const updateTaskStatus = async (id, status) => {
        try {
            await axios.patch(`/api/tasks/${id}/`, { status });
            fetchTasks(); // Refresh the tasks after updating
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const Column = ({ status }) => {
        return (
            <div className="column">
                <h2>{status.toUpperCase()}</h2>
                <div className="task-list">
                    {tasks
                        .filter(task => task.status === status)
                        .map(task => (
                            <TaskCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
                        ))}
                </div>
            </div>
        );
    };

    const TaskCard = ({ task, updateTaskStatus }) => {
        const [, ref] = useDrag({
            type: 'task',
            item: { id: task.id, status: task.status },
        });

        const [, drop] = useDrop({
            accept: 'task',
            drop: (draggedItem) => {
                if (draggedItem.status !== task.status) {
                    updateTaskStatus(draggedItem.id, task.status);
                }
            },
        });

        return (
            <div ref={(node) => ref(drop(node))} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="kanban-board flex">
                <Column status="todo" />
                <Column status="in-progress" />
                <Column status="done" />
            </div>
        </DndProvider>
    );
}

export default KanbanBoard;
