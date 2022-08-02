import apiClient from './apiClient';

const UserAPI = {
  me: async () => {
    const { data } = await apiClient.get('/user/me');
    return data;
  },
};

export default UserAPI;
