import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.77.44:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// ypload document method
export const uploadDocument = (document) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('document/upload/', task, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
