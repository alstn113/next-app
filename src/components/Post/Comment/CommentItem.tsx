import { Comment } from '@/lib/types';
import styled from '@emotion/styled';

interface Props {
  comment: Comment;
  subComment: boolean;
}

const CommentItem = ({ comment, subComment }: Props) => {
  const {
    text,
    user: { username },
    isDeletd,
  } = comment;

  return (
    <Container>
      {isDeletd ? (
        <div></div>
      ) : (
        <>
          <Profile>{username}</Profile>
          <CommentBlock></CommentBlock>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  height: 50px;
  width: 100%;
`;

const Profile = styled.div``;

const CommentBlock = styled.div``;

export default CommentItem;
