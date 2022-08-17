import Card from '@/components/common/Card/Card';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import useGetPostsByQueries, {
  IPostsByQueries,
} from '@/hooks/queries/post/useGetPostsByQueries';
import useGetME from '@/hooks/queries/user/useGetMe';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import PostAPI from '@/lib/api/post';
import formatDate from '@/lib/utils/formatDate';
import styled from '@emotion/styled';
import {
  dehydrate,
  DehydratedState,
  InfiniteData,
  QueryClient,
} from '@tanstack/react-query';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useGetPostsByQueries();

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const targetElement = useIntersectionObserver({ onIntersect: loadMore });

  return (
    <Container>
      {data?.pages?.map((page) =>
        page.posts.map((post) => (
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
                  <div>좋아요 : {post.likes}</div>
                  <div>{formatDate(post.createdAt)}</div>
                </div>
              </Link>
            </Card>
          </CardBox>
        )),
      )}
      {isFetching && <Skeleton />}
      <InfiniteScrollTarget ref={targetElement} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
`;

const CardBox = styled.div`
  margin: 1rem 0;
`;

const InfiniteScrollTarget = styled.div`
  visibility: hidden;
  width: 100%;
  height: 20px;
`;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    useGetPostsByQueries.getKey(),
    useGetPostsByQueries.fetcher(),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    },
  );
  const pages = queryClient.getQueryData<InfiniteData<IPostsByQueries>>(
    useGetPostsByQueries.getKey(),
  )?.pages;
  queryClient.setQueryData(useGetPostsByQueries.getKey(), {
    pages,
    pageParams: [null],
  });
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Home;
