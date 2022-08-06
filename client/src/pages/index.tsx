import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import formatDate from '@/libs/utils/formatDate';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data } = useGetPosts();

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <Link
            href={{
              pathname: '/post/[id]',
              query: { id: post.id },
            }}
          >
            <div>
              <div>
                {post.title} {post.body}
              </div>
              <div>{formatDate(post.createdAt)}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetPosts.getKey(), useGetPosts.fetcher());
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
