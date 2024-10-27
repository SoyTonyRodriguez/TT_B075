import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: 'http://192.168.1.11:8000/api/v1/'
<<<<<<< HEAD
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    baseURL: 'http://192.168.1.8:8000/api/v1/'
=======
    baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
>>>>>>> ea9b28351cd32fa8bff5bceb100464e6bbf30f33
})

// getall dates
export const getAllDates = () => accountsAPI.get(`calendar_date/`);

