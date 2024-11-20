import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.1.12:8000/api/v1/'
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    baseURL: 'http://192.168.100.97:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    //baseURL: 'http://192.168.1.8:8000/api/v1/'
})

// create task method
export const createTask = async (task) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.post('task/register/', task, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}

// getTasks from account method
export const getTasks = async (account_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.get(`tasks/${account_id}/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};

export const updateTask = async (taskId, updatedData) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.patch(`tasks/${taskId}/edit/`, updatedData, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};

export const deleteTask = async (taskId) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.delete(`tasks/${taskId}/delete/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};
