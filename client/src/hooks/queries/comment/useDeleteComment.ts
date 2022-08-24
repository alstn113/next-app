import { useMutation } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { UseMutationOptionsOf } from '@/hooks/queries/types';

const useDeleteComment = (options: UseMutationOptionsOf<typeof CommentAPI.deleteComment> = {}) => {
  return useMutation(CommentAPI.deleteComment, options);
};

export default useDeleteComment;
