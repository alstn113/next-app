import UserAPI from '@/libs/api/user';
import { ICustomAxiosError, IUser } from '@/libs/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetME = (
  options?: Omit<
    UseQueryOptions<IUser, ICustomAxiosError>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
) => {
  return useQuery<IUser, ICustomAxiosError>(['me'], UserAPI.me, options);
};

useGetME.fetcher = () => UserAPI.me;
useGetME.getKey = () => ['me'];

export default useGetME;
