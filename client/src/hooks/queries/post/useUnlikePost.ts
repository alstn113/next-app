import PostAPI from '@/lib/api/post';
import type { Post } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUnlikePost = (options?: UseMutationOptions<Post, CustomAxiosError, string>) => {
  return useMutation<Post, CustomAxiosError, string>(PostAPI.unlikePost, options);
};

export default useUnlikePost;
