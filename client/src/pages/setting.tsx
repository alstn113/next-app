import useGetME from '@/hooks/queries/user/useGetMe';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

const Setting = () => {
  return <div>Setting</div>;
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Setting;
