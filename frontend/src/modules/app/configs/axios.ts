import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  responseType: 'json',
});

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => Promise.reject(error?.response?.data),
);
