import PostAPI from '@/lib/api/post';
import type { UpdatePostParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<unknown, CustomAxiosError, UpdatePostParams>,
) => {
  return useMutation<unknown, CustomAxiosError, UpdatePostParams>(PostAPI.updatePost(id), options);
};

export default useUpdatePost;
