import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/auth/login`, loginData);
  return response.data.token;
};

export const getTodos = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/todos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTodo = async (todoData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/todos`, todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTodoStatus = async (id, statusData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/todos/${id}`, statusData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/todos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
