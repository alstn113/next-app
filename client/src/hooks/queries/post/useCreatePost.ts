import PostAPI from '@/lib/api/post';
import type { Post, CreatePostParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useCreatePost = (options?: UseMutationOptions<Post, CustomAxiosError, CreatePostParams>) => {
  return useMutation<Post, CustomAxiosError, CreatePostParams>(PostAPI.createPost, options);
};

export default useCreatePost;
