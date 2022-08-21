import PostAPI from '@/lib/api/post';
import type { Post } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLikePost = (options?: UseMutationOptions<Post, CustomAxiosError, string>) => {
  return useMutation<Post, CustomAxiosError, string>(PostAPI.likePost, options);
};

export default useLikePost;
