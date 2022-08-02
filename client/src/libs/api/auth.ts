import { ILoginRequest, IRegisterRequest } from '../interfaces';
import apiClient from './apiClient';

const AuthAPI = {
  login: async (input: ILoginRequest) => {
    const { data } = await apiClient.post('/auth/login', input);
    return data;
  },
  register: async (input: IRegisterRequest) => {
    const { data } = await apiClient.post('/auth/register', input);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.delete('/auth/logout');
    return data;
  },
};

export default AuthAPI;
