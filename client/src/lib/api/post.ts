import type { FindPostQuery, CreatePostParams, UpdatePostParams } from '@/lib/types';
import apiClient from './apiClient';

const PostAPI = {
  getPostsByQueries: async ({ cursor }: FindPostQuery) => {
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
  createPost: async (params: CreatePostParams) => {
    const { data } = await apiClient.post('/post', params);
    return data;
  },
  deletePost: async (postId: string) => {
    const { data } = await apiClient.delete(`/post/${postId}`);
    return data;
  },
  updatePost: (postId: string) => async (params: UpdatePostParams) => {
    const { data } = await apiClient.patch(`/post/${postId}`, params);
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
