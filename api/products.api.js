import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})

// create projection method
export const createProduct = (product) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('product/register/', product, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

// getTasks from account method
export const getProduct = (account_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`products/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProduct = (product_id, updatedData) => {
    const token = localStorage.getItem('token');
    return TasksAPI.patch(`products/${product_id}/edit/`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteProduct = (product_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`products/${product_id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};