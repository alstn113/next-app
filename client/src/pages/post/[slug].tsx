import CommentList from '@/components/CommentList';
import { Button, Card, Modal } from '@/components/common';
import useDisclosure from '@/hooks/useDisclosure';
import useDeletePost from '@/hooks/queries/post/useDeletePost';
import useGetPostBySlug from '@/hooks/queries/post/useGetPostBySlug';
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
  const slug = encodeURIComponent(router.query?.slug as string);
  const { data: user } = useGetME();
  const { data } = useGetPostBySlug(slug);
  const { mutate } = useDeletePost({
    onSuccess: () => {
      router.push('/');
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  return (
    <>
      <Container>
        <Card variant="bordered">
          <span>Title : {data?.title}</span>
          <span>Body : {data?.body}</span>
          <span>PostLikes : {data?.postStats.postLikes}</span>
          <span>Comment Counts : {data?.postStats.commentCounts}</span>
          <span>Slug : {data?.slug}</span>
          <span>CreatedAt : {formatDate(data?.createdAt)}</span>
          <ButtonBlock>
            {user?.username === data?.user.username && (
              <Button shadow color="error" onClick={onOpen}>
                삭제
              </Button>
            )}
          </ButtonBlock>
        </Card>
        <Card variant="bordered">
          <CommentList comments={data?.comments || []} slug={slug} postId={data?.id as string} />
        </Card>
      </Container>
      <Modal
        title="지우시겠습니까?"
        message="되돌릴 수 없습니다!!"
        visible={isOpen}
        onCancel={onClose}
        onConfirm={() => mutate(data?.id as string)}
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
  const slug = encodeURIComponent(params?.slug as string);

  const queryClient = new QueryClient();
  const post = await queryClient.fetchQuery(
    useGetPostBySlug.getKey(slug),
    useGetPostBySlug.fetcher(slug),
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
