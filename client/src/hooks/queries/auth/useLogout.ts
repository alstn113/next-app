import AuthAPI from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '@/hooks/queries/types';
import { AppError } from '@/lib/error';

const useLogout = (
  options: UseMutationOptionsOf<typeof AuthAPI.logout, AppError, void> = {},
) => {
  return useMutation(AuthAPI.logout, options);
};

export default useLogout;
