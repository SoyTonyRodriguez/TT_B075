import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'http://192.168.100.97:8000/api/v1/'
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

export const updateAccount = async (id, accountData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await accountsAPI.patch(`account/${id}/`, accountData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Retorna los datos si todo sale bien
    } catch (error) {
      console.error('Error al actualizar la cuenta:', error.response || error.message);  // Registro del error
      throw error;  // Lanza el error para manejarlo en el componente
    }
  };

  
  