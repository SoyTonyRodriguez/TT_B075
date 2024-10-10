import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
    //baseURL: 'http://192.168.77.44:8000/api/v1/'
    baseURL: 'http://192.168.1.143:8000/api/v1/'
})

// create projection method
export const createProduct = (projection) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('product/register/', projection, {
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

export const updateProduct = (projection_id, updatedData) => {
    const token = localStorage.getItem('token');
    return TasksAPI.patch(`products/${projection_id}/edit/`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteProduct = (projection_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`products/${projection_id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};