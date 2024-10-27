import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.77.44:8000/api/v1/'
<<<<<<< HEAD
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    baseURL: 'http://192.168.1.8:8000/api/v1/'
=======
    baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
>>>>>>> ea9b28351cd32fa8bff5bceb100464e6bbf30f33
})

// create projection method
export const createProjection = async (projection) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.post('projection/register/', projection, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}