import PostAPI from '@/lib/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseInfiniteQueryOptionsOf } from '@/hooks/queries/types';

const useGetPostsByQueries = (
  options: UseInfiniteQueryOptionsOf<typeof PostAPI.getPostsByQueries> = {},
) => {
  return useInfiniteQuery(getKey(), fetcher(), {
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
