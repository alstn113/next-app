import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { IComment } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';

const useDeleteComment = (options?: UseMutationOptions<IComment, ICustomAxiosError, string>) => {
  return useMutation<IComment, ICustomAxiosError, string>(CommentAPI.deleteComment, options);
};

export default useDeleteComment;
