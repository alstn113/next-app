import AuthAPI from '@/lib/api/auth';
import type { AuthParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogin = (options?: UseMutationOptions<undefined, CustomAxiosError, AuthParams>) => {
  return useMutation<undefined, CustomAxiosError, AuthParams>(AuthAPI.login, options);
};

export default useLogin;
