import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users'; // Adjust if necessary
const API_URL = '/api/users'; // Removed 'http://localhost:5000'

export const getUsers = () => axios.get(API_URL);
export const createUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

