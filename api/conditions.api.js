import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: 'http://192.168.1.12:8000/api/v1/'
    baseURL: 'http://192.168.1.10:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    //baseURL: 'http://192.168.1.8:8000/api/v1/'
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

