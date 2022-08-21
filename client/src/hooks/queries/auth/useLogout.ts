import AuthAPI from '@/lib/api/auth';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogout = (options?: UseMutationOptions<undefined, CustomAxiosError>) => {
  return useMutation<undefined, CustomAxiosError>(AuthAPI.logout, options);
};

export default useLogout;
