import type { Comment } from '@/lib/types';
import formatDate from '@/lib/utils/formatDate';
import styled from '@emotion/styled';
import SubCommentList from './SubCommentList';

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const {
    text,
    user: { username },
    createdAt,
    isDeleted,
    subComments,
  } = comment;
  return (
    <Block>
      {isDeleted ? (
        <DeletedComment>( 삭제된 댓글 )</DeletedComment>
      ) : (
        <>
          <Profile>{username}</Profile>
          <CommentBlock>{text}</CommentBlock>
          <Time>{formatDate(createdAt)}</Time>
        </>
      )}
      {subComments && <SubCommentList subComments={subComments} />}
    </Block>
  );
};

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DeletedComment = styled.p``;

const Profile = styled.div``;

const CommentBlock = styled.div``;

const Time = styled.div``;

export default CommentItem;
