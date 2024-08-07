// src/services/price.js
import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

export const getPrice = async (params) => {
  const response = await axios.get(`http://34.45.109.111:6868/token-price/`, { params });
  return response.data;
};