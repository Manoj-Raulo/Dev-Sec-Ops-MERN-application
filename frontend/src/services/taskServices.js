import axios from "axios";

// Use relative path so the browser hits the ALB Ingress
const API_URL = "/api";

export const getTasks = () => {
    return axios.get(`${API_URL}/tasks`);
};

export const addTask = (task) => {
    return axios.post(`${API_URL}/tasks`, task);
};

export const updateTask = (id, data) => {
    return axios.put(`${API_URL}/tasks/${id}`, data);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/tasks/${id}`);
};