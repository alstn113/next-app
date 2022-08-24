import type {
  FindPostQuery,
  CreatePostParams,
  UpdatePostParams,
  PostStats,
  Post,
  GetPostResult,
  GetSearchPostsResult,
  GetPostsByQueriesResult,
} from '@/lib/types';
import apiClient from './apiClient';

const PostAPI = {
  getPostsByQueries: async ({ cursor }: FindPostQuery) => {
    const { data } = await apiClient.get<GetPostsByQueriesResult>('/post', {
      params: { cursor },
    });
    return data;
  },
  getSearchPosts: async (keyword: string) => {
    const { data } = await apiClient.get<GetSearchPostsResult>(`/post/search?keyword=${keyword}`);
    return data;
  },
  getPostBySlug: async (slug: string) => {
    const { data } = await apiClient.get<GetPostResult>(`/post/${slug}`);
    return data;
  },
  createPost: async (params: CreatePostParams) => {
    const { data } = await apiClient.post<Post>('/post', params);
    return data;
  },
  deletePost: async (postId: string) => {
    const { data } = await apiClient.delete<Post>(`/post/${postId}`);
    return data;
  },
  updatePost: async ({ postId, params }: { postId: string; params: UpdatePostParams }) => {
    const { data } = await apiClient.patch<unknown>(`/post/${postId}`, params);
    return data;
  },
  likePost: async (postId: string) => {
    const { data } = await apiClient.post<PostStats>(`/post/${postId}/likes`);
    return data;
  },
  unlikePost: async (postId: string) => {
    const { data } = await apiClient.delete<PostStats>(`/post/${postId}/likes`);
    return data;
  },
};

export default PostAPI;
