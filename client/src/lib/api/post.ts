import type { IFindPostQuery, IPostCreateRequest, IPostUpdateRequest } from '@/lib/types';
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
  deletePost: async (postId: string) => {
    const { data } = await apiClient.delete(`/post/${postId}`);
    return data;
  },
  updatePost: (postId: string) => async (input: IPostUpdateRequest) => {
    const { data } = await apiClient.patch(`/post/${postId}`, input);
    return data;
  },
  likePost: async (postId: string) => {
    const { data } = await apiClient.post(`/post/${postId}/likes`);
    return data;
  },
  unlikePost: async (postId: string) => {
    const { data } = await apiClient.delete(`/post/${postId}/likes`);
    return data;
  },
};

export default PostAPI;
