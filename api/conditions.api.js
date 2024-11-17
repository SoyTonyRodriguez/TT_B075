import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
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

