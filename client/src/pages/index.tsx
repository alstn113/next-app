import Card from '@/components/common/Card/Card';
import useGetPosts from '@/hooks/queries/post/useGetPosts';
import useGetME from '@/hooks/queries/user/useGetMe';
import formatDate from '@/lib/utils/formatDate';
import styled from '@emotion/styled';
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
        <CardBox key={post.id}>
          <Card variant="bordered" isPressable>
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
          </Card>
        </CardBox>
      ))}
    </div>
  );
};

const CardBox = styled.div`
  margin: 1rem 0;
`;

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
