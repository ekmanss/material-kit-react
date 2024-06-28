// src/config.js

export const predefinedKeywords = [
  "AI", "All", "Alpha", "BTC", "Defi", "GameFi", "NFT", "memeCoin", "链上数据分析", "二级市场", "撸毛"
];

const config = {
  development: {
    API_URL: 'http://localhost:6060',
  },
  test: {
    API_URL: 'https://lfgapitest.roguex.io',
  },
  production: {
    API_URL: 'http://api.example.com',
  },
};

const env = import.meta.env.VITE_APP_ENV || 'test';

export default {
  ...config[env],
  predefinedKeywords
};