import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { Comment } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';

const useDeleteComment = (options?: UseMutationOptions<Comment, CustomAxiosError, string>) => {
  return useMutation<Comment, CustomAxiosError, string>(CommentAPI.deleteComment, options);
};

export default useDeleteComment;
