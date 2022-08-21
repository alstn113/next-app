import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import { IComment, ICustomAxiosError } from '@/lib/interfaces';

const useUnlikeComment = (options?: UseMutationOptions<IComment, ICustomAxiosError, string>) => {
  return useMutation<IComment, ICustomAxiosError, string>(CommentAPI.unlikeComment, options);
};

export default useUnlikeComment;
