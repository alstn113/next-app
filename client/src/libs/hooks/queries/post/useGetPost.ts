import PostAPI from '@/libs/api/post';
import { IPost, ICustomAxiosError } from '@/libs/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPost = (
  id: string,
  options?: Omit<
    UseQueryOptions<IPost, ICustomAxiosError>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
) => {
  return useQuery<IPost, ICustomAxiosError>(
    ['GetPost', id],
    () => PostAPI.getPost(id),
    options,
  );
};

useGetPost.fetcher = (id: string) => PostAPI.getPost(id);
useGetPost.getKey = (id: string) => ['GetPost', id];

export default useGetPost;
