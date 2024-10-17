import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.1.11:8000/api/v1/'
    baseURL: 'http://192.168.1.15:8000/api/v1/'
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