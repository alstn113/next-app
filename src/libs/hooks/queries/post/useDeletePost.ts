import PostAPI from '@/libs/api/post';
import { IPost, ICustomAxiosError } from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useDeletePost = (
  id: string,
  options?: Omit<UseMutationOptions<IPost, ICustomAxiosError>, 'mutationFn'>,
) => {
  return useMutation<IPost, ICustomAxiosError>(
    () => PostAPI.deletePost(id),
    options,
  );
};

export default useDeletePost;
