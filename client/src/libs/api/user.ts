import axios from 'axios';

const UserAPI = {
  getCurrentUser: async () => {
    const { data } = await axios.get('/api/auth/user');
    return data;
  },
  refreshTokens: async () => {
    const { data } = await axios.post('/api/auth/refresh');
    return data;
  },
};

export default UserAPI;
