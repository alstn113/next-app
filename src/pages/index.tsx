import AsyncBoundary from '@/components/AsyncBoundary';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import PostList from '@/components/PostList/PostList';
import { MESSAGE } from '@/constants/messages';
import PostAPI from '@/libs/api/post';
import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from 'next';

const Home: NextPage = () => {
  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback
          queryKey={useGetPosts.getKey()}
          message={MESSAGE.ERROR.LOAD_DATA}
        />
      }
    >
      <PostList />
    </AsyncBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetPosts.getKey(), PostAPI.getPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
