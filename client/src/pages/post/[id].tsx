import CommentList from '@/components/CommentList';
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
  const { mutate } = useDeletePost({
    onSuccess: () => {
      router.push('/');
    },
  });

  const { data } = useGetPost(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Container>
        <Card variant="bordered">
          <span>Title : {data?.title}</span>
          <span>Body : {data?.body}</span>
          <span>CreatedAt : {formatDate(data?.createdAt)}</span>
          <ButtonBlock>
            <Button shadow color="error" onClick={onOpen}>
              삭제
            </Button>
          </ButtonBlock>
        </Card>
        <Card variant="flat">
          <CommentList comments={data?.comments || []} postId={id} />
        </Card>
      </Container>
      <Modal
        title="지우시겠습니까?"
        message="주의!!"
        visible={isOpen}
        onCancel={onClose}
        onConfirm={() => mutate(id)}
      />
    </>
  );
};

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin-top: 2rem;
  div ~ div {
    margin-top: 1rem;
  }
`;

const ButtonBlock = styled.div`
  ${flexCenter}
  margin-top: 1rem;
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
