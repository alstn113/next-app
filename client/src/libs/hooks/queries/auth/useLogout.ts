import AuthAPI from '@/libs/api/auth';
import { ICustomAxiosError } from '@/libs/interfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useLogout = (
  options?: UseMutationOptions<undefined, ICustomAxiosError>,
) => {
  return useMutation<undefined, ICustomAxiosError>(AuthAPI.logout, options);
};

export default useLogout;
