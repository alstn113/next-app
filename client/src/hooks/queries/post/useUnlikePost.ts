import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUnlikePost = (options?: UseMutationOptions<IPost, ICustomAxiosError, string>) => {
  return useMutation<IPost, ICustomAxiosError, string>(PostAPI.unlikePost, options);
};

export default useUnlikePost;
