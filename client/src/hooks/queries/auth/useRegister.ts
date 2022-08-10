import AuthAPI from '@/lib/api/auth';
import { ICustomAxiosError, IRegisterRequest } from '@/lib/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useRegister = (
  options?: UseMutationOptions<undefined, ICustomAxiosError, IRegisterRequest>,
) => {
  return useMutation<undefined, ICustomAxiosError, IRegisterRequest>(
    AuthAPI.register,
    options,
  );
};

export default useRegister;
