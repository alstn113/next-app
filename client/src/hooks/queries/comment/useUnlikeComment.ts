import { useMutation } from '@tanstack/react-query';
import CommentAPI from '@/lib/api/comment';
import type { UseMutationOptionsOf } from '@/hooks/queries/types';

const useUnlikeComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.unlikeComment> = {},
) => {
  return useMutation(CommentAPI.unlikeComment, options);
};

export default useUnlikeComment;
