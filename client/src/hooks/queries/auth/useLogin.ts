import AuthAPI from '@/lib/api/auth';
import { ICustomAxiosError, ILoginRequest } from '@/lib/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogin = (options?: UseMutationOptions<undefined, ICustomAxiosError, ILoginRequest>) => {
  return useMutation<undefined, ICustomAxiosError, ILoginRequest>(AuthAPI.login, options);
};

export default useLogin;
