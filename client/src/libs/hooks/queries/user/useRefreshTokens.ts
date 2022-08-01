import UserAPI from '@/libs/api/user';
import { ICustomAxiosError } from '@/libs/interfaces';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useRefreshTokens = (
  options?: Omit<
    UseQueryOptions<unknown, ICustomAxiosError>,
    'queryKey' | 'queryFn' | 'initialData'
  >,
) => {
  return useQuery<unknown, ICustomAxiosError>(
    ['RefreshTokens'],
    UserAPI.refreshTokens,
    options,
  );
};

useRefreshTokens.fetcher = () => UserAPI.refreshTokens;
useRefreshTokens.getKey = () => ['RefreshTokens'];

export default useRefreshTokens;
