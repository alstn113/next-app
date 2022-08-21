import {
  IFindPostQuery,
  IPostCreateRequest,
  IPostUpdateRequest,
} from '../interfaces/post.interface';
import apiClient from './apiClient';

const PostAPI = {
  getPostsByQueries: async ({ cursor }: IFindPostQuery) => {
    const { data } = await apiClient.get('/post', {
      params: { cursor },
    });
    return data;
  },
  getSearchPosts: async (keyword: string) => {
    const { data } = await apiClient.get(`/post/search?keyword=${keyword}`);
    return data;
  },
  getPostBySlug: async (slug: string) => {
    const { data } = await apiClient.get(`/post/${slug}`);
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
