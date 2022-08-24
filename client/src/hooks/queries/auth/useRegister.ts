import AuthAPI from '@/lib/api/auth';
import type { AuthParams } from '@/lib/types';
import type { CustomAxiosError } from '@/lib/error';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

const useRegister = (options?: UseMutationOptions<void, CustomAxiosError, AuthParams>) => {
  return useMutation<void, CustomAxiosError, AuthParams>(AuthAPI.register, options);
};

export default useRegister;
