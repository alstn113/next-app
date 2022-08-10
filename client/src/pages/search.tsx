import useGetME from '@/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import TextInput from '@/components/common/TextInput/TextInput';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce<string>({ value: searchText, delay: 300 });
  return (
    <Container>
      <TextInput
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>{debouncedText}</div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  width: 250px;
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
