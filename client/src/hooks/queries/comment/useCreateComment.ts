import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { Comment, CreateCommentParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';

const useCreateComment = (
  options?: UseMutationOptions<Comment, CustomAxiosError, CreateCommentParams>,
) => {
  return useMutation<Comment, CustomAxiosError, CreateCommentParams>(
    CommentAPI.createComment,
    options,
  );
};

export default useCreateComment;
