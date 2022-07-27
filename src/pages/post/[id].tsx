import PostAPI from '@/libs/api/post';
import useGetPost from '@/libs/hooks/queries/post/useGetPost';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';

const PostDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, error } = useGetPost(id);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      {data.title} {data.body}
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
