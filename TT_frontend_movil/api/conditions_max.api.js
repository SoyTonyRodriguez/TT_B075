import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'http://192.168.1.9:8000/api/v1/'
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    //baseURL: 'http://192.168.1.8:8000/api/v1/'
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
})


// getDocuments from account method
export const getConditionsMax = async () => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    return accountsAPI.get(`max_conditions/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        }
    });
}

