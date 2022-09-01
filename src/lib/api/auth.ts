import type { AuthParams } from '@/lib/types';
import apiClient from './apiClient';

const AuthAPI = {
  login: async (params: AuthParams) => {
    const { data } = await apiClient.post<void>('/api/auth/login', params);
    return data;
  },
  register: async (params: AuthParams) => {
    const { data } = await apiClient.post<void>('/api/auth/register', params);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.delete<void>('/api/auth/logout');
    return data;
  },
};

export default AuthAPI;
