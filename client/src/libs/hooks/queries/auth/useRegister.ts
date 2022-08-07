import AuthAPI from '@/libs/api/auth';
import { ICustomAxiosError, IRegisterRequest } from '@/libs/interfaces';
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
