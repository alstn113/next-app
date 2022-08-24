import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { CustomAxiosError } from '@/lib/error';

const useUnlikeComment = (options?: UseMutationOptions<number, CustomAxiosError, string>) => {
  return useMutation<number, CustomAxiosError, string>(CommentAPI.unlikeComment, options);
};

export default useUnlikeComment;
