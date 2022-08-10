import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import useDisclosure from '@/hooks/useDisclosure';
import useGetME from '@/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>('text');
  const debouncedText = useDebounce<string>({ value: text, delay: 300 });
  return (
    <Container>
      <Button shadow onClick={onOpen}>
        Modal Open
      </Button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>{debouncedText}</div>
      <Modal
        title="This is Modal"
        message="This is Message"
        visible={isOpen}
        onCancel={onClose}
        onConfirm={onClose}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

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
