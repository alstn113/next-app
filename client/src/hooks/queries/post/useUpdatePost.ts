import PostAPI from '@/lib/api/post';
import type { IPost, IPostUpdateRequest } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<IPost, ICustomAxiosError, IPostUpdateRequest>,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostUpdateRequest>(PostAPI.updatePost(id), options);
};

export default useUpdatePost;
