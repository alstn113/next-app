import CommentList from '@/components/CommentList';
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Modal from '@/components/common/Modal/Modal';
import PostAPI from '@/lib/api/post';
import useDisclosure from '@/hooks/useDisclosure';
import useDeletePost from '@/hooks/queries/post/useDeletePost';
import useGetPost from '@/hooks/queries/post/useGetPost';
import useGetME from '@/hooks/queries/user/useGetMe';
import formatDate from '@/lib/utils/formatDate';
import { flexCenter } from '@/lib/styles/shared';
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
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
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
        <Card variant="bordered">
          <CommentList comments={data?.comments || []} postId={id} />
        </Card>
      </Container>
      <Modal
        title="지우시겠습니까?"
        message="되돌릴 수 없습니다!!"
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
  const post = await queryClient.fetchQuery(
    useGetPost.getKey(id),
    useGetPost.fetcher(id),
  );

  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());

  if (!post) {
    return {
      notFound: true,
    };
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default PostDetail;
