import { Comment } from '@/lib/types';
import styled from '@emotion/styled';

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return <Block>{comment.deletedAt ? '( 삭제된 댓글 )' : comment.text}</Block>;
};

const Block = styled.div`
  height: 50px;
  width: 100%;
`;

export default CommentItem;
