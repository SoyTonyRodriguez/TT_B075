import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: 'http://localhost:8000/api/v1',
})

// create task method
// export const createTask = (task) => accountsAPI.post('task/register/', task)
export const createTask = (task) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('task/register/', task, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}


// getTasks from account method
export const getTasks = (account_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`tasks/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateTask = (taskId, updatedData) => {
    const token = localStorage.getItem('token');
    return TasksAPI.patch(`tasks/${taskId}/edit/`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTask = (taskId) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`tasks/${taskId}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};