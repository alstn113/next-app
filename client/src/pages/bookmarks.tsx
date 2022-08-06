import useGetME from '@/libs/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

const Bookmarks = () => {
  return (
    <div>
      <Container />
      <Container />
      <Container />
      <Container />
      <Container />
      <Container />
      <Container />
      <Container />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
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
};

const Container = styled.div`
  height: 200px;
  width: 200px;
  background-color: red;
  margin: 2rem;
`;

export default Bookmarks;
