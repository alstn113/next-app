import SvgArrowLeft from '@/components/vectors/SvgArrowLeft';
import PlusCircle from '@/components/vectors/SvgPlusCircle';
import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
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
      <SvgArrowLeft />
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
  await queryClient.prefetchQuery(useGetPosts.getKey(), useGetPosts.fetcher());
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
