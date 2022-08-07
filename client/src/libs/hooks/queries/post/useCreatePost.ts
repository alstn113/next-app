import PostAPI from '@/libs/api/post';
import {
  IPost,
  ICustomAxiosError,
  IPostCreateRequest,
} from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useCreatePost = (
  options?: UseMutationOptions<IPost, ICustomAxiosError, IPostCreateRequest>,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostCreateRequest>(
    PostAPI.createPost,
    options,
  );
};

export default useCreatePost;
