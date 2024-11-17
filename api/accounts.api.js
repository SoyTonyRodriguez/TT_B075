import axios from "axios";

// Initial set-up
// Obtén la base URL desde las variables de entorno
const accountsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});


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