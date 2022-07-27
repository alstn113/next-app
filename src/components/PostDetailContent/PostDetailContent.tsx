import useGetPost from '@/libs/hooks/queries/post/useGetPost';

interface Props {
  id: string;
}

const PostDetailContent = ({ id }: Props) => {
  const { data } = useGetPost(id);

  return (
    <div>
      {data?.title} {data?.body}
    </div>
  );
};

export default PostDetailContent;
