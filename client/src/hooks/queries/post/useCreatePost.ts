import PostAPI from '@/lib/api/post';
import type { IPost, IPostCreateRequest } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useCreatePost = (
  options?: UseMutationOptions<IPost, ICustomAxiosError, IPostCreateRequest>,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostCreateRequest>(PostAPI.createPost, options);
};

export default useCreatePost;
