import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Modal from '@/components/common/Modal/Modal';
import PostAPI from '@/libs/api/post';
import useDisclosure from '@/libs/hooks/common/useDisclosure';
import useDeletePost from '@/libs/hooks/queries/post/useDeletePost';
import useGetPost from '@/libs/hooks/queries/post/useGetPost';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import formatDate from '@/libs/utils/formatDate';
import { flexCenter } from '@/styles/shared';
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
  const { mutate } = useDeletePost(id, {
    onSuccess: () => {
      router.push('/');
    },
  });

  const { data } = useGetPost(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Container>
        <Card variant="bordered">Title : {data?.title}</Card>
        <Card variant="flat">Body : {data?.body}</Card>
        <Card variant="shadow">CreatedAt : {formatDate(data?.createdAt)}</Card>
        <Button shadow size="lg" onClick={onOpen}>
          삭제
        </Button>
        <Card variant="flat">
          {data?.comments?.map((comment) => (
            <div key={comment.id}>{comment.text}</div>
          ))}
        </Card>
      </Container>
      <Modal
        title="지우시겠습니까?"
        message="주의!!"
        visible={isOpen}
        onCancel={onClose}
        onConfirm={mutate}
      />
    </>
  );
};

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin-top: 2rem;
  * + * {
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
