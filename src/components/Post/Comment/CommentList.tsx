import type { Comment } from '@/lib/types';
import formatDate from '@/lib/utils/formatDate';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  postId: string;
  slug: string;
}

const CommentList = ({ comments, postId, slug }: Props) => {
  return (
    <Container>
      <CommentsBlock>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </CommentsBlock>
      <CommentInput postId={postId} slug={slug} />
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const CommentsBlock = styled.div`
  width: 100%;
  padding: 0 8px;
`;

export default CommentList;
