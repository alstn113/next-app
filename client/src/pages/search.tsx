import useGetME from '@/libs/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

const Search = () => {
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
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

const Container = styled.div`
  height: 200px;
  width: 200px;
  background-color: red;
  margin: 2rem;
`;

export default Search;
