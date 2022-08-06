import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '@/libs/hooks/queries/auth/useRegister';
import useGetME from '@/libs/hooks/queries/user/useGetMe';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import TextInput from '@/components/common/TextInput/TextInput';
import Button from '@/components/common/Button/Button';

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('필수항목입니다'),
  password: yup.string().required('필수 항목입니다'),
});

const Register: NextPage = () => {
  const { mutate } = useRegister({
    onSuccess: async () => {
      Router.push('/login');
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
        <TextInput
          {...register('username')}
          type="text"
          placeholder="username"
        />
        <p>{errors.username?.message}</p>
        <TextInput
          {...register('password')}
          type="text"
          placeholder="password"
        />
        <p>{errors.password?.message}</p>
        <Button shadow type="submit">
          REGISTER
        </Button>
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
  const user = await queryClient.fetchQuery(
    useGetME.getKey(),
    useGetME.fetcher(),
  );
  if (user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Register;
