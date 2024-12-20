import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: 'https://tt-b075.onrender.com/api/v1/'
})

// getall dates
export const getAllDates = () => accountsAPI.get(`calendar_date/`);

