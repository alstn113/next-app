import PostAPI from '@/libs/api/post';
import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
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
              {post.title} {post.body}
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
  await queryClient.prefetchQuery(useGetPosts.getKey(), PostAPI.getPosts);
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
