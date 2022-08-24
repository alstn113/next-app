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
  return useInfiniteQuery<PostsByQueries, CustomAxiosError>(getKey(), fetcher(), {
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    suspense: false,
    ...options,
  });
};

const getKey = () => ['GetPostsByQueries'];
const fetcher =
  () =>
  ({ pageParam }: any) =>
    PostAPI.getPostsByQueries({ cursor: pageParam });

useGetPostsByQueries.getKey = getKey;
useGetPostsByQueries.fetcher = fetcher;

export default useGetPostsByQueries;
