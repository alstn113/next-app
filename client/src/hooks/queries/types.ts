import { CustomAxiosError } from '@/lib/error';
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

// velopert님꺼 참고했음 굳굳!

export type UseQueryOptionsOf<
  T extends (...args: any) => any,
  E = CustomAxiosError,
> = UseQueryOptions<
  Awaited<ReturnType<T>>,
  E,
  Awaited<ReturnType<T>>,
  string[]
>;

export type UseInfiniteQueryOptionsOf<
  T extends (...args: any) => any,
  E = CustomAxiosError,
> = UseInfiniteQueryOptions<
  Awaited<ReturnType<T>>,
  E,
  Awaited<ReturnType<T>>,
  Awaited<ReturnType<T>>,
  string[]
>;

export type UseMutationOptionsOf<
  T extends (...args: any) => any,
  E = CustomAxiosError,
> = UseMutationOptions<Awaited<ReturnType<T>>, E, Parameters<T>[0]>;
