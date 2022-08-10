import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetSearchPosts = (
  keyword: string,
  options?: UseQueryOptions<IPost[], ICustomAxiosError>,
) => {
  return useQuery<IPost[], ICustomAxiosError>(
    ['GetSearchPosts', keyword],
    () => PostAPI.getSearchPosts(keyword),
    options,
  );
};

useGetSearchPosts.fetcher = (keyword: string) => () =>
  PostAPI.getSearchPosts(keyword);
useGetSearchPosts.getKey = (keyword: string) => ['GetSearchPosts', keyword];

export default useGetSearchPosts;
