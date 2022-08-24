import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { CustomAxiosError } from '@/lib/error';

const useLikeComment = (options?: UseMutationOptions<number, CustomAxiosError, string>) => {
  return useMutation<number, CustomAxiosError, string>(CommentAPI.likeComment, options);
};

export default useLikeComment;
