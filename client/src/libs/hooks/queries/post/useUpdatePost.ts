import PostAPI from '@/libs/api/post';
import {
  IPost,
  ICustomAxiosError,
  IPostUpdateRequest,
} from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePost = (
  id: string,
  options?: Omit<
    UseMutationOptions<IPost, ICustomAxiosError, IPostUpdateRequest>,
    'mutationFn'
  >,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostUpdateRequest>(
    PostAPI.updatePost(id),
    options,
  );
};

export default useUpdatePost;
