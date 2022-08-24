import UserAPI from '@/lib/api/user';
import type { User } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

const useGetME = (options?: UseQueryOptions<User, CustomAxiosError>) => {
  return useQuery<User, CustomAxiosError>(getKey(), fetcher(), options);
};

const getKey = () => ['me'];
const fetcher = () => UserAPI.me;

useGetME.getKey = getKey;
useGetME.fetcher = fetcher;

export default useGetME;
