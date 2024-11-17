import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

// Initial set-up
const accountsAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

// register method
export const createAccount = (account) => accountsAPI.post('register/', account)

// Login method
export const login = (credentials) => accountsAPI.post('login/', credentials)

// getAccount method
export const getAccount = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const cleanToken = token.replace(/["]/g, '').trim();
    return accountsAPI.get(`account/${id}/`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
    });
  };  
