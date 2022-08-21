import AuthAPI from '@/lib/api/auth';
import { ICustomAxiosError } from '@/lib/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogout = (options?: UseMutationOptions<undefined, ICustomAxiosError>) => {
  return useMutation<undefined, ICustomAxiosError>(AuthAPI.logout, options);
};

export default useLogout;
