import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button shadow onClick={() => setIsOpen(true)}>
        Modal Open
      </Button>
      <Modal
        title="This is Modal"
        message="This is Message"
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
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

export default Search;
