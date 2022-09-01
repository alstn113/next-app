import { User } from '../types';
import apiClient from './apiClient';

const UserAPI = {
  me: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<User>('/user/me');
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
