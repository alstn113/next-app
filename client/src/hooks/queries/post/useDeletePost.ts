import PostAPI from '@/lib/api/post';
import type { IPost } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useDeletePost = (options?: UseMutationOptions<IPost, ICustomAxiosError, string>) => {
  return useMutation<IPost, ICustomAxiosError, string>(PostAPI.deletePost, options);
};

export default useDeletePost;
