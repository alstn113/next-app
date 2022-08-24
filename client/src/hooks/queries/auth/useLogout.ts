import AuthAPI from '@/lib/api/auth';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogout = (options?: UseMutationOptions<void, CustomAxiosError>) => {
  return useMutation<void, CustomAxiosError>(AuthAPI.logout, options);
};

export default useLogout;
