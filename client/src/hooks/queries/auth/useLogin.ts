import AuthAPI from '@/lib/api/auth';
import type { ILoginRequest } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogin = (options?: UseMutationOptions<undefined, ICustomAxiosError, ILoginRequest>) => {
  return useMutation<undefined, ICustomAxiosError, ILoginRequest>(AuthAPI.login, options);
};

export default useLogin;
