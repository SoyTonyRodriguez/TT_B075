import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
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

