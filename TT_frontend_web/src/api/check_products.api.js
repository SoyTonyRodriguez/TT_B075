import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'http://192.168.1.142:8000/api/v1/',
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

