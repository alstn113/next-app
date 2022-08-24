import { User } from '../types';
import apiClient from './apiClient';

const UserAPI = {
  me: async () => {
    const { data } = await apiClient.get<User>('/user/me');
    return data;
  },
};

export default UserAPI;
