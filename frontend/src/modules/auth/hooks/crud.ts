import { apiClient } from 'src/modules/app/configs/axios';
import { AuthData } from '../interfaces';

const endpoint = '/auth';

export const authLogin = async (data: AuthData, setToken: (token: string | null) => void) => {
  try {
    const response = await apiClient.post(`${endpoint}/login`, data);
    const token = response.data.token;

    setToken(token);

    return token;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const authRegisterUser = async (data: AuthData) => {
  const response = await apiClient.post(`${endpoint}/register`, data);
  return response.data;
};
