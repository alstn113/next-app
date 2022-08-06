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

  const { data } = useGetPost(id);

  return (
    <div>
      {data?.title} {data?.body}
    </div>
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

  const post = queryClient.getQueryData(useGetPost.getKey(id));

  if (!post) {
    return {
      notFound: true,
    };
  }
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default PostDetail;
