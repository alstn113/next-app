import PostAPI from '@/lib/api/post';
import type { Post, UpdatePostParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<Post, CustomAxiosError, UpdatePostParams>,
) => {
  return useMutation<Post, CustomAxiosError, UpdatePostParams>(PostAPI.updatePost(id), options);
};

export default useUpdatePost;
