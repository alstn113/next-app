import { AppError } from '@/lib/error';
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseQueryOptionsOf<
  T extends (...args: any) => any,
  E = AppError,
> = UseQueryOptions<
  Awaited<ReturnType<T>>,
  E,
  Awaited<ReturnType<T>>,
  string[]
>;

export type UseInfiniteQueryOptionsOf<
  T extends (...args: any) => any,
  E = AppError,
> = UseInfiniteQueryOptions<
  Awaited<ReturnType<T>>,
  E,
  Awaited<ReturnType<T>>,
  Awaited<ReturnType<T>>,
  string[]
>;

export type UseMutationOptionsOf<
  T extends (...args: any) => any,
  E = AppError,
> = UseMutationOptions<Awaited<ReturnType<T>>, E, Parameters<T>[0]>;
