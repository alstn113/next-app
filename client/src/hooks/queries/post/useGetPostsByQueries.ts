import PostAPI from '@/lib/api/post';
import type { IPostList } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';

export interface IPostsByQueries {
  posts: IPostList;
  nextCursor?: string;
}

const useGetPostsByQueries = (
  options?: UseInfiniteQueryOptions<IPostsByQueries, ICustomAxiosError>,
) => {
  return useInfiniteQuery<IPostsByQueries, ICustomAxiosError>(
    ['GetPostsByQueries'],
    ({ pageParam }) => PostAPI.getPostsByQueries({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
      suspense: false,
      ...options,
    },
  );
};

useGetPostsByQueries.fetcher =
  () =>
  ({ pageParam }: any) =>
    PostAPI.getPostsByQueries({ cursor: pageParam });
useGetPostsByQueries.getKey = () => ['GetPostsByQueries'];

export default useGetPostsByQueries;
