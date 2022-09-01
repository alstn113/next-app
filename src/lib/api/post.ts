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
    const { data } = await apiClient.get<GetPostsByQueriesResult>('/api/post', {
      params: { cursor },
    });
    return data;
  },
  getSearchPosts: async (keyword: string) => {
    const { data } = await apiClient.get<GetSearchPostsResult>(
      `/api/post/search?keyword=${keyword}`,
    );
    return data;
  },
  getPostBySlug: async (slug: string) => {
    const { data } = await apiClient.get<GetPostResult>(`/api/post/${slug}`);
    return data;
  },
  createPost: async (params: CreatePostParams) => {
    const { data } = await apiClient.post<Post>('/api/post', params);
    return data;
  },
  deletePost: async (postId: string) => {
    const { data } = await apiClient.delete<Post>(`/api/post/${postId}`);
    return data;
  },
  updatePost: async ({
    postId,
    params,
  }: {
    postId: string;
    params: UpdatePostParams;
  }) => {
    const { data } = await apiClient.patch<unknown>(
      `/api/post/${postId}`,
      params,
    );
    return data;
  },
  likePost: async (postId: string) => {
    const { data } = await apiClient.post<PostStats>(
      `/api/post/${postId}/likes`,
    );
    return data;
  },
  unlikePost: async (postId: string) => {
    const { data } = await apiClient.delete<PostStats>(
      `/api/post/${postId}/likes`,
    );
    return data;
  },
};

export default PostAPI;
