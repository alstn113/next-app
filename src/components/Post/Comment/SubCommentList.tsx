import { Comment } from '@/lib/types';
import styled from '@emotion/styled';
import CommentItem from './CommentItem';

interface Props {
  subComments: Comment[];
}

const SubCommentList = ({ subComments }: Props) => {
  return (
    <SubCommentsBlock>
      {subComments.map((subComment) => (
        <CommentItem comment={subComment} key={subComment.id} />
      ))}
    </SubCommentsBlock>
  );
};

const SubCommentsBlock = styled.div`
  padding-left: 24px;
`;

export default SubCommentList;
