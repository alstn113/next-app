import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/libs/api/comment';
import { IComment, ICustomAxiosError } from '@/libs/interfaces';

const useDeleteComment = (
  options?: UseMutationOptions<IComment, ICustomAxiosError, string>,
) => {
  return useMutation<IComment, ICustomAxiosError, string>(
    CommentAPI.deleteComment,
    options,
  );
};

export default useDeleteComment;
