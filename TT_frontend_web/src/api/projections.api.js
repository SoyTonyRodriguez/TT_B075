import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
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