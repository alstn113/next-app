import useCreatePost from '@/hooks/queries/post/useCreatePost';
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useGetME from '@/hooks/queries/user/useGetMe';
import { TextInput, Button, ErrorMessage } from '@/components/common';
import styled from '@emotion/styled';
import { flexCenter } from '@/lib/styles/shared';
import useGetPostsByQueries from '@/hooks/queries/post/useGetPostsByQueries';

interface IFormInput {
  title: string;
  body: string;
}

const schema = yup.object().shape({
  title: yup.string().required('필수항목입니다'),
  body: yup.string().required('필수 항목입니다'),
});

const Write: NextPage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useCreatePost({
    onSuccess: async () => {
      await queryClient.invalidateQueries(useGetPostsByQueries.getKey());
      Router.push('/');
    },
  });
  const onSubmit = (input: IFormInput) => {
    mutate(input);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('title')}
          type="text"
          color="secondary"
          placeholder="TITLE"
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextInput
          {...register('body')}
          type="text"
          color="secondary"
          placeholder="BODY"
        />
        <ErrorMessage>{errors.body?.message}</ErrorMessage>
        <Button size="lg" shadow type="submit">
          POST
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter}
`;

const Form = styled.form`
  margin-top: 8rem;
  width: 250px;
  ${flexCenter}
  flex-direction: column;
  button {
    margin-top: 1rem;
  }
`;
export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  const user = await queryClient.fetchQuery(
    useGetME.getKey(),
    useGetME.fetcher(),
  );
  if (!user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Write;
