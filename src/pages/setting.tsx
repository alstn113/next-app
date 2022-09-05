import { Button } from '@/components/common';
import TabLayout from '@/components/Layouts/TabLayout';
import useGetME from '@/hooks/queries/user/useGetMe';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import useLogout from '@/hooks/queries/auth/useLogout';
import Router from 'next/router';

const Setting = () => {
  const { data } = useGetME();
  const { mutate } = useLogout({
    onSuccess: () => {
      window.location.href = '/';
    },
  });
  return (
    <TabLayout>
      <Container>
        {data ? (
          <Button shadow>{data.username}</Button>
        ) : (
          <Button color="warning" shadow onClick={() => Router.push('/login')}>
            로그인
          </Button>
        )}
        {data && (
          <Button color="warning" shadow onClick={() => mutate()}>
            로그아웃
          </Button>
        )}
      </Container>
    </TabLayout>
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

export default Setting;
