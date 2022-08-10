import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
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
