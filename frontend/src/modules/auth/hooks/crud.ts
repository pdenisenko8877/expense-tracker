import { apiClient } from 'src/modules/app/configs/axios';
import { Token } from 'src/modules/app/types';

import { AuthData, AuthRegisterData } from '../interfaces';

const endpoint = '/auth';

export const authLogin = async (data: AuthData, setToken: (token: Token) => void) => {
  try {
    const response = await apiClient.post(`${endpoint}/login`, data);
    const token = response.data.token;

    setToken(token);

    return token;
  } catch (error) {
    throw error;
  }
};

export const authRegisterUser = async (data: AuthRegisterData) => {
  const response = await apiClient.post(`${endpoint}/register`, data);
  return response.data;
};
