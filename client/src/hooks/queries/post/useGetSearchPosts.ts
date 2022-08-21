import PostAPI from '@/lib/api/post';
import type { PostList } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetSearchPosts = (
  keyword: string,
  options?: UseQueryOptions<PostList, CustomAxiosError>,
) => {
  return useQuery<PostList, CustomAxiosError>(
    ['GetSearchPosts', keyword],
    () => PostAPI.getSearchPosts(keyword),
    options,
  );
};

useGetSearchPosts.fetcher = (keyword: string) => () => PostAPI.getSearchPosts(keyword);
useGetSearchPosts.getKey = (keyword: string) => ['GetSearchPosts', keyword];

export default useGetSearchPosts;
