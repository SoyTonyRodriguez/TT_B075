import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const accountsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})


// getDocuments from account method
export const getConditions = async () => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    return accountsAPI.get(`category_conditions/`, {
        headers: {
            'Content-Type': 'application/json', // Agrega este header
            Authorization: `Bearer ${cleanToken}`,
        }
    });
}

