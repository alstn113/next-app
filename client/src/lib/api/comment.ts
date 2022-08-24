import type { Comment, CreateCommentParams } from '@/lib/types';
import apiClient from '@/lib/api/apiClient';

const CommentAPI = {
  createComment: async (params: CreateCommentParams) => {
    const { data } = await apiClient.post<Comment>('/comment', params);
    return data;
  },
  deleteComment: async (commentId: string) => {
    const { data } = await apiClient.delete<Comment>(`/comment/${commentId}`);
    return data;
  },
  likeComment: async (commentId: string) => {
    const { data } = await apiClient.post<number>(`/comment/${commentId}/likes`);
    return data;
  },
  unlikeComment: async (commentId: string) => {
    const { data } = await apiClient.delete<number>(`/comment/${commentId}/likes`);
    return data;
  },
};

export default CommentAPI;
