import axios from 'axios';
import { API_URL } from '../../config/api';
import { setupAuthInterceptor } from './interceptors';
const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL || 'http://your-api-url',
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  },
});



export const authInterceptor = setupAuthInterceptor(api);
export default api;
