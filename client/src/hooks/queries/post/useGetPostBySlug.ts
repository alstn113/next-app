import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPostBySlug = (id: string, options?: UseQueryOptions<IPost, ICustomAxiosError>) => {
  return useQuery<IPost, ICustomAxiosError>(
    ['GetPostBySlug', id],
    () => PostAPI.getPostBySlug(id),
    options,
  );
};

useGetPostBySlug.fetcher = (id: string) => () => PostAPI.getPostBySlug(id);
useGetPostBySlug.getKey = (id: string) => ['GetPostBySlug', id];

export default useGetPostBySlug;
