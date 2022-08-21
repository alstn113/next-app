import UserAPI from '@/lib/api/user';
import type { User } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetME = (options?: UseQueryOptions<User, CustomAxiosError>) => {
  return useQuery<User, CustomAxiosError>(['me'], UserAPI.me, options);
};

useGetME.fetcher = () => UserAPI.me;
useGetME.getKey = () => ['me'];

export default useGetME;
