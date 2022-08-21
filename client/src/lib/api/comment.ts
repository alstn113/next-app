import { ICommentCreateRequest } from '@/lib/interfaces';
import apiClient from '@/lib/api/apiClient';

const CommentAPI = {
  createComment: async (input: ICommentCreateRequest) => {
    const { data } = await apiClient.post('/comment', input);
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
