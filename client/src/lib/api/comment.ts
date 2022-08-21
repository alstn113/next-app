import type { CreateCommentParams } from '@/lib/types';
import apiClient from '@/lib/api/apiClient';

const CommentAPI = {
  createComment: async (params: CreateCommentParams) => {
    const { data } = await apiClient.post('/comment', params);
    return data;
  },
  deleteComment: async (commentId: string) => {
    const { data } = await apiClient.delete(`/comment/${commentId}`);
    return data;
  },
  likeComment: async (commentId: string) => {
    const { data } = await apiClient.post(`/comment/${commentId}/likes`);
    return data;
  },
  unlikeComment: async (commentId: string) => {
    const { data } = await apiClient.delete(`/comment/${commentId}/likes`);
    return data;
  },
};

export default CommentAPI;
