import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

export const fetchKols = async () => {
  console.log("API_URL::",API_URL)
  const response = await axios.get(`${API_URL}/kol_rank`);
  return response.data;
};

export const fetchKolById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// 其他 API 调用...