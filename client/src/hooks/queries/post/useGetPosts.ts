import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPosts = (options?: UseQueryOptions<IPost[], ICustomAxiosError>) => {
  return useQuery<IPost[], ICustomAxiosError>(
    ['GetPosts'],
    PostAPI.getPosts,
    options,
  );
};

useGetPosts.fetcher = () => PostAPI.getPosts;
useGetPosts.getKey = () => ['GetPosts'];

export default useGetPosts;
