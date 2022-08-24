import PostAPI from '@/lib/api/post';
import type { PostList } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetSearchPosts = (
  keyword: string,
  options?: UseQueryOptions<PostList, CustomAxiosError>,
) => {
  return useQuery<PostList, CustomAxiosError>(getKey(keyword), fetcher(keyword), options);
};

const getKey = (keyword: string) => ['GetSearchPosts', keyword];
const fetcher = (keyword: string) => () => PostAPI.getSearchPosts(keyword);

useGetSearchPosts.getKey = getKey;
useGetSearchPosts.fetcher = fetcher;

export default useGetSearchPosts;
