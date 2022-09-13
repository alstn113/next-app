import type { Comment } from '@/lib/types';
import formatDate from '@/lib/utils/formatDate';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import CommentInput from './CommentInput';

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
          <div key={comment.id}>
            {comment.deletedAt ? (
              <div>삭제된 댓글</div>
            ) : (
              <div>
                {comment.text} {formatDate(comment.createdAt)}
              </div>
            )}
            {comment?.subComments?.map((subComment) => (
              <div key={subComment.id}>
                {subComment.deletedAt ? (
                  <div>-- 삭제된 댓글</div>
                ) : (
                  <div>
                    -- {subComment.text} {formatDate(subComment.createdAt)}
                  </div>
                )}
                {subComment.subComments?.map((subSubComment) => (
                  <div key={subSubComment.id}>
                    {subSubComment.deletedAt ? (
                      <div>---- 삭제된 댓글</div>
                    ) : (
                      <div>
                        ---- {subSubComment.text}{' '}
                        {formatDate(subSubComment.createdAt)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
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
  margin-top: 0.5rem;
  div {
    width: 100%;
  }
`;

export default CommentList;
