import useGetME from '@/hooks/queries/user/useGetMe';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

const Bookmarks = () => {
  return (
    <Container>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  try {
    const user = await queryClient.fetchQuery(
      useGetME.getKey(),
      useGetME.fetcher(),
    );
    if (!user)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    return { props: { dehydratedState: dehydrate(queryClient) } };
  } finally {
    queryClient.clear();
  }
};

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: red;
  margin: 2rem;
`;

export default Bookmarks;
