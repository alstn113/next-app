import useCreateComment from '@/hooks/queries/comment/useCreateComment';
import useGetPostBySlug from '@/hooks/queries/post/useGetPostBySlug';
import type { Comment } from '@/lib/types';
import formatDate from '@/lib/utils/formatDate';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from './common/@Components/Button/Button';
import Card from './common/@Components/Card/Card';
import ErrorMessage from './common/@Components/ErrorMessage/ErrorMessage';
import TextInput from './common/@Components/TextInput/TextInput';

interface Props {
  comments: Comment[];
  postId: string;
  slug: string;
}

interface IFormInput {
  text: string;
}

const schema = yup.object().shape({
  text: yup.string().required('필수항목입니다'),
});

const CommentList = ({ comments, postId, slug }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetPostBySlug.getKey(slug));
      reset({ text: '' });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (input: IFormInput) => {
    mutate({ ...input, postId });
  };

  return (
    <Container>
      <CommentsBlock>
        <Card variant="bordered">
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
        </Card>
      </CommentsBlock>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('text')} type="text" placeholder="Comment" />
        <ErrorMessage>{errors.text?.message}</ErrorMessage>
        <Button shadow size="auto" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  ${flexCenter}
  flex-direction: column;
  button {
    margin-top: 0.5rem;
  }
`;

const CommentsBlock = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  div {
    width: 100%;
  }
`;

export default CommentList;
