import PostAPI from '@/lib/api/post';
import type { Post } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPostBySlug = (slug: string, options?: UseQueryOptions<Post, CustomAxiosError>) => {
  return useQuery<Post, CustomAxiosError>(getKey(slug), fetcher(slug), options);
};

const getKey = (slug: string) => ['GetPostBySlug', slug];
const fetcher = (slug: string) => () => PostAPI.getPostBySlug(slug);

useGetPostBySlug.getKey = getKey;
useGetPostBySlug.fetcher = fetcher;

export default useGetPostBySlug;
