import PostAPI from '@/lib/api/post';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '@/hooks/queries/types';

const useGetPostBySlug = (
  slug: string,
  options: UseQueryOptionsOf<typeof PostAPI.getPostBySlug> = {},
) => {
  return useQuery(getKey(slug), fetcher(slug), options);
};

const getKey = (slug: string) => ['GetPostBySlug', slug];
const fetcher = (slug: string) => () => PostAPI.getPostBySlug(slug);

useGetPostBySlug.getKey = getKey;
useGetPostBySlug.fetcher = fetcher;

export default useGetPostBySlug;
