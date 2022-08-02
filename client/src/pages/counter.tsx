import useGetME from '@/libs/hooks/queries/user/useGetMe';
import counterAtom from '@/libs/store/counter';
import { Button, Text } from '@nextui-org/react';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import { useRecoilState } from 'recoil';

const Counter: NextPage = () => {
  const [state, setState] = useRecoilState(counterAtom);
  return (
    <div>
      <Button shadow auto onClick={() => setState({ count: state.count + 1 })}>
        플러스
      </Button>

      <Text>{state.count}</Text>

      <Button shadow auto onClick={() => setState({ count: state.count - 1 })}>
        마이너스
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
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Counter;
