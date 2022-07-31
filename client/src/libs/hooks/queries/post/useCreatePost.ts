import PostAPI from '@/libs/api/post';
import {
  IPost,
  ICustomAxiosError,
  IPostCreateRequest,
} from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useCreatePost = (
  options?: Omit<
    UseMutationOptions<IPost, ICustomAxiosError, IPostCreateRequest>,
    'mutationFn'
  >,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostCreateRequest>(
    PostAPI.createPost,
    options,
  );
};

export default useCreatePost;
