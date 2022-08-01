import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import useGetCurrentUser from '@/libs/hooks/queries/user/useGetCurrentUser';
import { Button, Spacer } from '@nextui-org/react';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';

const About: NextPage = () => {
  const login = async () => {
    await axios.post('/api/auth/signin', {
      username: 'alstn113',
      password: 'alstn123',
    });
  };
  const logout = async () => {
    await axios.post('/api/auth/logout');
  };
  const refresh = async () => {
    await axios.post('/api/auth/refresh');
  };
  const user = async () => {
    const { data } = await axios.get('/api/auth/user');
    console.log(data);
  };

  return (
    <div>
      <Button auto shadow onPress={login}>
        LOGIN
      </Button>
      <Spacer />
      <Button auto shadow onPress={logout}>
        LOGOUT
      </Button>
      <Spacer />
      <Button auto shadow onPress={refresh}>
        REFRESH
      </Button>
      <Spacer />
      <Button auto shadow onPress={user}>
        USER
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useGetCurrentUser.getKey(),
    useGetCurrentUser.fetcher(),
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default About;
