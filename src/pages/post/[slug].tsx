import CommentList from '@/components/Post/Comment/CommentList';
import { Button, Card } from '@/components/common';
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
import useGetCommentsBySlug from '@/hooks/queries/comment/useGetCommentsBySlug';
import mediaQuery from '@/lib/styles/mediaQuery';
import useModalStore from '@/lib/store/useModalStore';
import { extractError } from '@/lib/error';
import BasicLayout from '@/components/Layouts/BasicLayout';

const PostDetail: NextPage = () => {
  const router = useRouter();
  const slug = encodeURIComponent(router.query?.slug as string);
  const { data: user } = useGetME();
  const { data: post } = useGetPostBySlug(slug);
  const { data: comments } = useGetCommentsBySlug(slug);
  const { mutate } = useDeletePost({
    onSuccess: () => {
      router.push('/');
    },
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
    onMutate: () => {},
  });
  const { open } = useModalStore();

  return (
    <BasicLayout hasBackButton>
      <Container>
        <Card variant="bordered">
          <span>Title : {post?.title}</span>
          <span>Body : {post?.body}</span>
          <span>PostLikes : {post?.postStats.likes}</span>
          <span>Comment Counts : {post?.postStats.commentsCount}</span>
          <span>Slug : {post?.slug}</span>
          <span>CreatedAt : {formatDate(post?.createdAt)}</span>
          <ButtonBlock>
            {user?.username === post?.user.username && (
              <Button
                shadow
                size="auto"
                color="error"
                onClick={() =>
                  open({
                    title: '지우시겠습니까?',
                    message: '되돌릴 수 없습니다.',
                    onConfirm: () => mutate(post?.id!),
                  })
                }
              >
                삭제
              </Button>
            )}
          </ButtonBlock>
        </Card>
        <Card variant="bordered">
          <CommentList comments={comments!} slug={slug} postId={post?.id!} />
        </Card>
      </Container>
    </BasicLayout>
  );
};

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
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

  try {
    await Promise.all([
      queryClient.fetchQuery(
        useGetPostBySlug.getKey(slug),
        useGetPostBySlug.fetcher(slug),
      ),
      queryClient.fetchQuery(
        useGetCommentsBySlug.getKey(slug),
        useGetCommentsBySlug.fetcher(slug),
      ),
      queryClient.fetchQuery(useGetME.getKey(), useGetME.fetcher()),
    ]);

    return { props: { dehydratedState: dehydrate(queryClient) } };
  } catch (e) {
    const error = extractError(e);
    if (error.name === 'NotFound')
      return {
        notFound: true,
      };
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};

export default PostDetail;
