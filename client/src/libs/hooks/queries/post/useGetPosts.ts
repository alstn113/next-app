import PostAPI from '@/libs/api/post';
import { IPost, ICustomAxiosError } from '@/libs/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPosts = (
  options?: Omit<
    UseQueryOptions<IPost[], ICustomAxiosError>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
) => {
  return useQuery<IPost[], ICustomAxiosError>(
    ['GetPosts'],
    PostAPI.getPosts,
    options,
  );
};

useGetPosts.getKey = () => ['GetPosts'];

export default useGetPosts;
