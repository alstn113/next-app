import PostAPI from '@/lib/api/post';
import type { PostList } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';

export interface PostsByQueries {
  posts: PostList;
  nextCursor?: string;
}

const useGetPostsByQueries = (
  options?: UseInfiniteQueryOptions<PostsByQueries, CustomAxiosError>,
) => {
  return useInfiniteQuery<PostsByQueries, CustomAxiosError>(
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
