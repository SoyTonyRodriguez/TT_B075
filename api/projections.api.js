import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// create projection method
export const createProjection = (projection) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('projection/register/', projection, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

// getTasks from account method
export const getProjection = (account_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`tasks/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProjection = (projection_id, updatedData) => {
    const token = localStorage.getItem('token');
    return TasksAPI.patch(`tasks/${projection_id}/edit/`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteProjection = (projection_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`tasks/${projection_id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};