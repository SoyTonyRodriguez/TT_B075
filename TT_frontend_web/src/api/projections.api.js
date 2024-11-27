import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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

export const getProjection = (account_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`projections/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const deleteProjection = (projection_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`projections/${projection_id}/delete/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}