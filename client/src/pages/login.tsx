import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLogin from '@/libs/hooks/queries/auth/useLogin';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('필수항목입니다'),
  password: yup.string().required('필수 항목입니다'),
});

const Login: NextPage = () => {
  const { mutate } = useLogin({
    onSuccess: async () => {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} type="text" placeholder="username" />
        <p>{errors.username?.message}</p>
        <input {...register('password')} type="text" placeholder="password" />
        <p>{errors.password?.message}</p>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useGetME.getKey(), useGetME.fetcher());
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Login;
