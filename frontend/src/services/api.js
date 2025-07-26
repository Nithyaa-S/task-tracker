import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const addTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/tasks/${id}`);
  return res.data;
};
