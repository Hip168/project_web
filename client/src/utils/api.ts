import axios from 'axios';

const api = axios.create({
    baseURL: 'https://projectwebserver-production.up.railway.app/api',

    // api when running locally from docker
    // baseURL: 'http://localhost:5001/api',

    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
