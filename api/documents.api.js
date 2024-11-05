import axios from "axios";

// Initial set-up
const TasksAPI = axios.create({
//baseURL: 'http://192.168.1.11:8000/api/v1/'
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
    baseURL: 'http://192.168.1.14:8000/api/v1/'
    //baseURL: 'http://192.168.1.143:8000/api/v1/'
    //baseURL: 'http://192.168.1.15:8000/api/v1/'
})

// upload document method
export const uploadDocument = (document) => {
    const token = localStorage.getItem('token');
    return TasksAPI.post('document/upload/', document, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

// getDocuments from account method
export const getDocuments = (account_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`documents/${account_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getDocument = (document_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.get(`document/${document_id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const deleteDocument = (document_id) => {
    const token = localStorage.getItem('token');
    return TasksAPI.delete(`document/${document_id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const replaceDocument = (document_id, document) => {
    const token = localStorage.getItem('token');
    return TasksAPI.patch(`document/${document_id}/replace/`, document, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
