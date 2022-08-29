import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '@/hooks/queries/types';
import CommentAPI from '@/lib/api/comment';

const useGetCommentsBySlug = (
  slug: string,
  options: UseQueryOptionsOf<typeof CommentAPI.getCommentsBySlug> = {},
) => {
  return useQuery(getKey(slug), fetcher(slug), options);
};

const getKey = (slug: string) => ['GetCommentsBySlug', slug];
const fetcher = (slug: string) => () => CommentAPI.getCommentsBySlug(slug);

useGetCommentsBySlug.getKey = getKey;
useGetCommentsBySlug.fetcher = fetcher;

export default useGetCommentsBySlug;
