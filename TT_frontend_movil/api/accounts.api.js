import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: 'http://192.168.1.11:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// register method
export const createAccount = (account) => accountsAPI.post('register/', account)

// Login method
export const login = (credentials) => accountsAPI.post('login/', credentials)

// getAccount method
export const getAccount = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.trim(); // Elimina espacios en blanco adicionales
    return accountsAPI.get(`account/${id}/`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    });
  };  
