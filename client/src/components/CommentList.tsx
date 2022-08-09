import useCreateComment from '@/libs/hooks/queries/comment/useCreateComment';
import useGetPost from '@/libs/hooks/queries/post/useGetPost';
import { IComment } from '@/libs/interfaces';
import formatDate from '@/libs/utils/formatDate';
import { flexCenter } from '@/styles/shared';
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('text')} type="text" placeholder="text" />
        <ErrorMessage>{errors.text?.message}</ErrorMessage>
        <Button size="lg" type="submit">
          POST
        </Button>
      </Form>
      <CommentsBlock>
        <Card variant="bordered">
          {comments.map((comment) => (
            <div key={comment.id}>
              {comment.text} {formatDate(comment.createdAt)}
            </div>
          ))}
        </Card>
      </CommentsBlock>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter};
  flex-direction: column;
`;

const Form = styled.form`
  width: 80%;
  ${flexCenter}
  flex-direction: column;
  button {
    margin-top: 0.5rem;
  }
`;

const CommentsBlock = styled.div`
  width: 80%;
  margin-top: 0.5rem;
  div {
    width: 100%;
  }
`;

export default CommentList;
