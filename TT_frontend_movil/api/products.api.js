import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const TasksAPI = axios.create({
    baseURL: 'http://192.168.1.142:8000/api/v1/',
})

// create projection method
export const createProduct = async (product) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    return TasksAPI.post('product/register/', product, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}

// getTasks from account method
export const getProduct = async (account_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.get(`products/${account_id}/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};

export const updateProduct = async (product_id, updatedData) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.patch(`products/${product_id}/edit/`, updatedData, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};

export const deleteProduct = async (product_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.delete(`products/${product_id}/delete/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};