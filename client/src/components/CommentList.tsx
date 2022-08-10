import useCreateComment from '@/hooks/queries/comment/useCreateComment';
import useGetPost from '@/hooks/queries/post/useGetPost';
import { IComment } from '@/lib/interfaces';
import formatDate from '@/lib/utils/formatDate';
import { flexCenter } from '@/lib/styles/shared';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from './common/Button/Button';
import Card from './common/Card/Card';
import ErrorMessage from './common/ErrorMessage/ErrorMessage';
import TextInput from './common/TextInput/TextInput';

interface Props {
  comments: IComment[];
  postId: string;
}

interface IFormInput {
  text: string;
}

const schema = yup.object().shape({
  text: yup.string().required('필수항목입니다'),
});

const CommentList = ({ comments, postId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetPost.getKey(postId));
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
              {comment.text} {formatDate(comment.createdAt)}
            </div>
          ))}
        </Card>
      </CommentsBlock>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('text')} type="text" placeholder="Comment" />
        <ErrorMessage>{errors.text?.message}</ErrorMessage>
        <Button size="lg" type="submit">
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