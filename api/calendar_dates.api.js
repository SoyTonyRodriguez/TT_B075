import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    //baseURL: 'http://192.168.1.11:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
})

// getall dates
export const getAllDates = () => accountsAPI.get(`calendar_date/`);

