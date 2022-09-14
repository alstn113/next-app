import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../../common/@Components/Button/Button';
import ErrorMessage from '../../common/@Components/ErrorMessage/ErrorMessage';
import TextInput from '../../common/@Components/TextInput/TextInput';
import * as yup from 'yup';
import useCreateComment from '@/hooks/queries/comment/useCreateComment';
import useGetCommentsBySlug from '@/hooks/queries/comment/useGetCommentsBySlug';
import { extractError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { flexCenter } from '@/lib/styles/shared';

interface IFormInput {
  text: string;
}

const schema = yup.object().shape({
  text: yup.string().required('필수항목입니다'),
});

interface Props {
  postId: string;
  slug: string;
}

const CommentInput = ({ postId, slug }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const queryClient = useQueryClient();

  const { mutate } = useCreateComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetCommentsBySlug.getKey(slug));
      reset({ text: '' });
    },
    /** 임시로 alert만 표시 */
    onError: (e) => {
      const error = extractError(e);
      alert(error.message);
    },
  });

  const onSubmit = ({ text }: IFormInput) => {
    mutate({ text, postId });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput {...register('text')} type="text" placeholder="Comment" />
      <ErrorMessage>{errors.text?.message}</ErrorMessage>
      <Button shadow size="auto" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  ${flexCenter}
  flex-direction: column;
  button {
    margin-top: 0.5rem;
  }
`;

export default CommentInput;
