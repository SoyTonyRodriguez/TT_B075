import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.1.12:8000/api/v1/'
    baseURL: 'http://192.168.1.10:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    //baseURL: 'http://192.168.1.8:8000/api/v1/'
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


export const getProjection = async (account_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.get(`projections/${account_id}/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}