import PostAPI from '@/lib/api/post';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '@/hooks/queries/types';

const useUpdatePost = (options: UseMutationOptionsOf<typeof PostAPI.updatePost> = {}) => {
  return useMutation(PostAPI.updatePost, options);
};

export default useUpdatePost;
