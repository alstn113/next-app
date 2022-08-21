import PostAPI from '@/lib/api/post';
import type { IPost } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLikePost = (options?: UseMutationOptions<IPost, ICustomAxiosError, string>) => {
  return useMutation<IPost, ICustomAxiosError, string>(PostAPI.likePost, options);
};

export default useLikePost;
