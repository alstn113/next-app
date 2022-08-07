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
    },
  });

  const {
    register,
    handleSubmit,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('text')} type="text" placeholder="text" />
        <p>{errors.text?.message}</p>
        <Button size="lg" type="submit">
          POST
        </Button>
      </form>
      <Card variant="bordered">
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.text} {formatDate(comment.createdAt)}
          </div>
        ))}
      </Card>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter};
  flex-direction: column;
`;
export default CommentList;
