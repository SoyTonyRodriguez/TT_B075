import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})

// getall dates
export const getAllDates = () => accountsAPI.get(`calendar_date/`);

