import PostAPI from '@/libs/api/post';
import useGetPosts from '@/libs/post/useGetPosts';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data, isLoading, error } = useGetPosts();
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error.</div>;

  return (
    <div>
      {data.map((post) => (
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
