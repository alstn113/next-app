import { User } from '../types';
import apiClient from './apiClient';

const UserAPI = {
  me: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<User>('/api/user/me');
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
