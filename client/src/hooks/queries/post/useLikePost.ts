import PostAPI from '@/lib/api/post';
import type { PostStats } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLikePost = (options?: UseMutationOptions<PostStats, CustomAxiosError, string>) => {
  return useMutation<PostStats, CustomAxiosError, string>(PostAPI.likePost, options);
};

export default useLikePost;
