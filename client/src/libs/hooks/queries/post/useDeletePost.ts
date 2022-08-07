import PostAPI from '@/libs/api/post';
import { IPost, ICustomAxiosError } from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useDeletePost = (
  options?: UseMutationOptions<IPost, ICustomAxiosError, string>,
) => {
  return useMutation<IPost, ICustomAxiosError, string>(
    PostAPI.deletePost,
    options,
  );
};

export default useDeletePost;
