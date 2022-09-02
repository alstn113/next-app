import { Button } from '@/components/common';
import useGetME from '@/hooks/queries/user/useGetMe';
import useOpenLoginDialog from '@/hooks/useOpenLoginDialog';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

const Setting = () => {
  const openLoginDialog = useOpenLoginDialog();
  return (
    <Container>
      <Box />
      <Button onClick={() => openLoginDialog()}>좋아요</Button>;
      <Box />
    </Container>
  );
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

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery(useGetME.getKey(), useGetME.fetcher());

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } finally {
    queryClient.clear();
  }
};

export default Setting;
