import PostAPI from '@/lib/api/post';
import type { IPost } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPostBySlug = (slug: string, options?: UseQueryOptions<IPost, ICustomAxiosError>) => {
  return useQuery<IPost, ICustomAxiosError>(
    ['GetPostBySlug', slug],
    () => PostAPI.getPostBySlug(slug),
    options,
  );
};

useGetPostBySlug.fetcher = (slug: string) => () => PostAPI.getPostBySlug(slug);
useGetPostBySlug.getKey = (slug: string) => ['GetPostBySlug', slug];

export default useGetPostBySlug;
