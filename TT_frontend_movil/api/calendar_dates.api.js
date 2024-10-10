import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'http://192.168.77.44:8000/api/v1/'
})

// getall dates
export const getAllDates = () => accountsAPI.get(`calendar_date/`);

