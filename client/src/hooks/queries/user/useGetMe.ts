import UserAPI from '@/lib/api/user';
import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsOf } from '@/hooks/queries/types';

const useGetME = (options: UseQueryOptionsOf<typeof UserAPI.me> = {}) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['me'];
const fetcher = () => UserAPI.me;

useGetME.getKey = getKey;
useGetME.fetcher = fetcher;

export default useGetME;
