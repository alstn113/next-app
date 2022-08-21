import PostAPI from '@/lib/api/post';
import type { IPostList } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetSearchPosts = (
  keyword: string,
  options?: UseQueryOptions<IPostList, ICustomAxiosError>,
) => {
  return useQuery<IPostList, ICustomAxiosError>(
    ['GetSearchPosts', keyword],
    () => PostAPI.getSearchPosts(keyword),
    options,
  );
};

useGetSearchPosts.fetcher = (keyword: string) => () => PostAPI.getSearchPosts(keyword);
useGetSearchPosts.getKey = (keyword: string) => ['GetSearchPosts', keyword];

export default useGetSearchPosts;
