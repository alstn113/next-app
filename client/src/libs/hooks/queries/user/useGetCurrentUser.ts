import UserAPI from '@/libs/api/user';
import { ICustomAxiosError, IUser } from '@/libs/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetCurrentUser = (
  options?: Omit<
    UseQueryOptions<IUser, ICustomAxiosError>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
) => {
  return useQuery<IUser, ICustomAxiosError>(
    ['GetCurrentUser'],
    UserAPI.getCurrentUser,
    options,
  );
};

useGetCurrentUser.fetcher = () => UserAPI.getCurrentUser;
useGetCurrentUser.getKey = () => ['GetCurrentUser'];

export default useGetCurrentUser;
