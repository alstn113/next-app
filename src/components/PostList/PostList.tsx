import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import Link from 'next/link';

const PostList = () => {
  const { data } = useGetPosts();

  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <Link
            href={{
              pathname: '/post/[id]',
              query: { id: post.id },
            }}
          >
            <div>
              {post.title} {post.body}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
