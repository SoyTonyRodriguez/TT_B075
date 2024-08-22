import axios from "axios";

// Initial set-up
const accountsAPI = axios.create({
  baseURL: 'http://localhost:8000/api/v1/accounts/'
})

// Accounts mehods
export const createAccount = (account) => accountsAPI.post('/', account)