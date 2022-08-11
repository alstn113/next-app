import useGetME from '@/hooks/queries/user/useGetMe';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import TextInput from '@/components/common/TextInput/TextInput';
import useGetSearchPosts from '@/hooks/queries/post/useGetSearchPosts';
import formatDate from '@/lib/utils/formatDate';
import Link from 'next/link';
import Card from '@/components/common/Card/Card';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce<string>({ value: searchText });
  const { data } = useGetSearchPosts(debouncedText, {
    retry: true,
    suspense: false,
    enabled: !!debouncedText,
  });
  return (
    <Container>
      <TextInput
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div>
        {data?.map((post) => (
          <CardBox key={post.id}>
            <Card variant="bordered" isPressable>
              <Link
                href={{
                  pathname: '/post/[id]',
                  query: { id: post.id },
                }}
              >
                <div>
                  <div>
                    {post.title} {post.body}
                  </div>
                  <div>{formatDate(post.createdAt)}</div>
                </div>
              </Link>
            </Card>
          </CardBox>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  width: 250px;
`;

const CardBox = styled.div`
  margin: 1rem 0;
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
