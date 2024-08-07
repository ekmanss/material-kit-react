// src/services/price.js
import axios from 'axios';
import config from '../config/config';

const API_URL = config.API_URL;

export const getPrice = async (params) => {
  const response = await axios.get(`https://kolapi.xfinder.fun/token-price/`, { params });
  return response.data;
};