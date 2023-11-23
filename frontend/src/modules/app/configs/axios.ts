import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  responseType: 'json',
});

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error?.response?.status === 403) {
      window.location.assign('/403');
    }
    if (error?.response?.status === 404) {
      window.location.assign('/404');
    }

    return Promise.reject(error?.response?.data);
  },
);
