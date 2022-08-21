import type { AuthParams } from '@/lib/types';
import apiClient from './apiClient';

const AuthAPI = {
  login: async (params: AuthParams) => {
    const { data } = await apiClient.post('/auth/login', params);
    return data;
  },
  register: async (params: AuthParams) => {
    const { data } = await apiClient.post('/auth/register', params);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.delete('/auth/logout');
    return data;
  },
};

export default AuthAPI;
