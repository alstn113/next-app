import { Card, Skeleton } from '@/components/common';
import useGetPostsByQueries from '@/hooks/queries/post/useGetPostsByQueries';
import type { GetPostsByQueriesResult } from '@/lib/types';
import useGetME from '@/hooks/queries/user/useGetMe';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
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
import mediaQuery from '@/lib/styles/mediaQuery';

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
              <Link href={`/post/${encodeURIComponent(post.slug)}`}>
                <a>
                  <div>
                    <div>제목 : {post.title}</div>
                    <div>좋아요 : {post.postStats.likes}</div>
                    <div>{formatDate(post.createdAt)}</div>
                  </div>
                </a>
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

const CardBox = styled.div``;

const Container = styled.div`
  min-width: 768px;
  ${mediaQuery.sm} {
    min-width: 250px;
  }
  ${CardBox} + ${CardBox} {
    margin-top: 1rem;
  }
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
  const pages = queryClient.getQueryData<InfiniteData<GetPostsByQueriesResult>>(
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
