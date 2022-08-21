import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { IComment, ICommentCreateRequest } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';

const useCreateComment = (
  options?: UseMutationOptions<IComment, ICustomAxiosError, ICommentCreateRequest>,
) => {
  return useMutation<IComment, ICustomAxiosError, ICommentCreateRequest>(
    CommentAPI.createComment,
    options,
  );
};

export default useCreateComment;
