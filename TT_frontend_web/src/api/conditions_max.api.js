import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
})



// getDocuments from account method
export const getConditionsMax = () => {
    const token = localStorage.getItem('token');
    return accountsAPI.get(`max_conditions/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

