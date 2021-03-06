import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_BASE_URL) || 'http://localhost:8080';
const X_API_KEY = process.env.REACT_APP_TENANT_API_KEY || 'Missing api key';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': X_API_KEY,
  },
});
