import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: 'http://localhost:8000/api/v1',
})


// getDocuments from account method
export const getConditions = () => {
    const token = localStorage.getItem('token');
    return accountsAPI.get(`category_conditions/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

