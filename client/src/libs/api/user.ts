import axios from 'axios';
import apiClient from './apiClient';

const UserAPI = {
  getCurrentUser: async () => {
    const { data } = await axios.get('http://localhost:3000/api/auth/user', {
      withCredentials: true,
    });
    return data;
  },
  refreshTokens: async () => {
    const { data } = await axios.post('/api/auth/refresh');
    return data;
  },
};

export default UserAPI;
