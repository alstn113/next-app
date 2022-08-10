import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError, IPostUpdateRequest } from '@/lib/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<IPost, ICustomAxiosError, IPostUpdateRequest>,
) => {
  return useMutation<IPost, ICustomAxiosError, IPostUpdateRequest>(
    PostAPI.updatePost(id),
    options,
  );
};

export default useUpdatePost;
