import { User } from '../types';
import apiClient from './apiClient';

const UserAPI = {
  me: async () => {
    try {
      const { data } = await apiClient.get<User | null>('/user/me');
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
