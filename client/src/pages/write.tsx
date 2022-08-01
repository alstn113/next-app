import useCreatePost from '@/libs/hooks/queries/post/useCreatePost';
import useGetPosts from '@/libs/hooks/queries/post/useGetPosts';
import { useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
      await queryClient.invalidateQueries(useGetPosts.getKey());
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
        <input {...register('title')} type="text" placeholder="title" />
        <p>{errors.title?.message}</p>
        <input {...register('body')} type="text" placeholder="body" />
        <p>{errors.body?.message}</p>
        <button type="submit">POST</button>
      </form>
    </div>
  );
};

export default Write;
