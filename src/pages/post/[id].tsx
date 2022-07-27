import AsyncBoundary from '@/components/AsyncBoundary';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import PostDetailContent from '@/components/PostDetailContent/PostDetailContent';
import { MESSAGE } from '@/constants/messages';
import PostAPI from '@/libs/api/post';
import useGetPost from '@/libs/hooks/queries/post/useGetPost';
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

  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback
          message={MESSAGE.ERROR.LOAD_DATA}
          queryKey={useGetPost.getKey(id)}
        />
      }
    >
      <PostDetailContent id={id} />
    </AsyncBoundary>
  );
};

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

  const data = queryClient.getQueryData(useGetPost.getKey(id));

  if (!data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default PostDetail;
