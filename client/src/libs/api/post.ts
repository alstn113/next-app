import {
  IPostCreateRequest,
  IPostUpdateRequest,
} from '../interfaces/post.interface';
import apiClient from './apiClient';

const PostAPI = {
  getPosts: async () => {
    const { data } = await apiClient.get('/post');
    return data;
  },
  getPost: async (id: string) => {
    const { data } = await apiClient.get(`/post/${id}`);
    return data;
  },
  createPost: async (input: IPostCreateRequest) => {
    const { data } = await apiClient.post('/post', input);
    return data;
  },
  deletePost: async (id: string) => {
    const { data } = await apiClient.delete(`/post/${id}`);
    return data;
  },
  updatePost: (id: string) => async (input: IPostUpdateRequest) => {
    const { data } = await apiClient.patch(`/post/${id}`, input);
    return data;
  },
};

export default PostAPI;
