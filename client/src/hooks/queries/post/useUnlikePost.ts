import PostAPI from '@/lib/api/post';
import type { PostStats } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUnlikePost = (options?: UseMutationOptions<PostStats, CustomAxiosError, string>) => {
  return useMutation<PostStats, CustomAxiosError, string>(PostAPI.unlikePost, options);
};

export default useUnlikePost;
