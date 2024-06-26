const config = {
  development: {
    API_URL: 'https://lfgapitest.roguex.io',
  },
  test: {
    API_URL: 'https://lfgapitest.roguex.io',
  },
  production: {
    API_URL: 'http://api.example.com',
  },
};

const env = import.meta.env.VITE_APP_ENV || 'development';

export default config[env];