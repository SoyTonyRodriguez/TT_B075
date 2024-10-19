import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.77.44:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// upload document method
export const uploadDocument = async (document) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.post('document/upload/', document, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}

// getDocuments from account method
export const getDocuments = async (account_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.get(`documents/${account_id}/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}

export const getDocument = async (document_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.get(`document/${document_id}/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}

export const deleteDocument = async (document_id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();

    return TasksAPI.delete(`document/${document_id}/delete/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
};

export const replaceDocument = async (document_id, document) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    
    return TasksAPI.patch(`document/${document_id}/replace/`, document, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        },
    });
}
