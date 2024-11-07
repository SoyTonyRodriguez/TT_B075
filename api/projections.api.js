import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.1.12:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    //baseURL: 'http://192.168.1.8:8000/api/v1/'
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