import AuthAPI from '@/lib/api/auth';
import type { IRegisterRequest } from '@/lib/types';
import type { ICustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useRegister = (
  options?: UseMutationOptions<undefined, ICustomAxiosError, IRegisterRequest>,
) => {
  return useMutation<undefined, ICustomAxiosError, IRegisterRequest>(AuthAPI.register, options);
};

export default useRegister;
