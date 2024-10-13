import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: 'http://192.168.77.44:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// register method
export const createAccount = (account) => accountsAPI.post('register/', account)

// Login method
export const login = (credentials) => accountsAPI.post('login/', credentials)

// getAccount method
export const getAccount = (id) => {
  const token = localStorage.getItem('token');
  return accountsAPI.get(`account/${id}/`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
};
export const updateAccount = (id, token, updatedData) => {
  return accountsAPI.patch(`account/${id}/`, updatedData, {
      headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token JWT en las cabeceras
      },
  });
};