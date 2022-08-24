import PostAPI from '@/lib/api/post';
import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsOf } from '@/hooks/queries/types';

const useGetSearchPosts = (
  keyword: string,
  options: UseQueryOptionsOf<typeof PostAPI.getSearchPosts> = {},
) => {
  return useQuery(getKey(keyword), fetcher(keyword), options);
};

const getKey = (keyword: string) => ['GetSearchPosts', keyword];
const fetcher = (keyword: string) => () => PostAPI.getSearchPosts(keyword);

useGetSearchPosts.getKey = getKey;
useGetSearchPosts.fetcher = fetcher;

export default useGetSearchPosts;
