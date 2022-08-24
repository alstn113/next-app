import PostAPI from '@/lib/api/post';
import type { PostStats } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsOf } from '@/hooks/queries/types';

const useLikePost = (options: UseMutationOptionsOf<typeof PostAPI.likePost> = {}) => {
  return useMutation<PostStats, CustomAxiosError, string>(PostAPI.likePost, options);
};

export default useLikePost;
