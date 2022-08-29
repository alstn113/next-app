import { AppError } from '@/lib/error';
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseMutationOptionsOf<TAPI extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<TAPI>>,
    AppError,
    Parameters<TAPI>[0] extends undefined ? void : Parameters<TAPI>[0]
  >;

export type UseQueryOptionsOf<TAPI extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<TAPI>>,
    AppError,
    Awaited<ReturnType<TAPI>>,
    string[]
  >;

export type UseInfiniteQueryOptionsOf<TAPI extends (...args: any) => any> =
  UseInfiniteQueryOptions<
    Awaited<ReturnType<TAPI>>,
    AppError,
    Awaited<ReturnType<TAPI>>,
    Awaited<ReturnType<TAPI>>,
    string[]
  >;
