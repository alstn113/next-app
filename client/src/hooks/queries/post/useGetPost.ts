import PostAPI from '@/lib/api/post';
import { IPost, ICustomAxiosError } from '@/lib/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetPost = (
  id: string,
  options?: UseQueryOptions<IPost, ICustomAxiosError>,
) => {
  return useQuery<IPost, ICustomAxiosError>(
    ['GetPost', id],
    () => PostAPI.getPost(id),
    options,
  );
};

useGetPost.fetcher = (id: string) => () => PostAPI.getPost(id);
useGetPost.getKey = (id: string) => ['GetPost', id];

export default useGetPost;
