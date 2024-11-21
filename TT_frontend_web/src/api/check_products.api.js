import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: 'http://localhost:8000/api/v1',
})


// getDocuments from account method
export const get_Check_Products = (account_id) => {
    const token = localStorage.getItem('token');
    return accountsAPI.get(`product_check/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

