import Card from '@/components/common/Card/Card';
import PostAPI from '@/libs/api/post';
import useGetPost from '@/libs/hooks/queries/post/useGetPost';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import formatDate from '@/libs/utils/formatDate';
import styled from '@emotion/styled';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';

const PostDetail: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = useGetPost(id);

  return (
    <Container>
      <Card variant="bordered">Title : {data?.title}</Card>
      <Card variant="flat">Body : {data?.body}</Card>
      <Card variant="shadow">CreatedAt : {formatDate(data?.createdAt)}</Card>
      <Card variant="flat">
        {data?.comments?.map((comment) => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </Card>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
  div + div {
    margin-top: 1rem;
  }
`;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const id = params?.id as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetPost.getKey(id), () =>
    PostAPI.getPost(id),
  );

  const post = queryClient.getQueryData(useGetPost.getKey(id));
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());

  if (!post) {
    return {
      notFound: true,
    };
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default PostDetail;
