import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

export const fetchKols = async () => {
  console.log('API_URL::', API_URL);
  const response = await axios.get(`${API_URL}/kol_rank`);
  return response.data;
};

export const fetchKolById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const updateKol = async (kolData) => {
  const response = await axios.put(`${API_URL}/kol/${kolData.id}`, kolData);
  return response.data;
};

export const deleteKol = async (id) => {
  const response = await axios.delete(`${API_URL}/kol/${id}`);
  return response.data;
};

export const createKol = async (kolData) => {
  const response = await axios.post(`${API_URL}/kol`, kolData);
  return response.data;
};