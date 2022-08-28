import axios from 'axios';

type ErrorName =
  | 'UnknownError'
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'NotFoundError';

interface ErrorPayloads {
  UnknownError: undefined;
  UserExistsError: undefined;
  AuthenticationError: undefined;
  NotFoundError: undefined;
}

export interface AppError {
  statusCode: number;
  message: string;
  name: ErrorName;
  payload?: ErrorPayloads[ErrorName];
}

export const isAppError = (error: any): error is AppError => {
  // 가물가물해서 기록!
  // optional chaining은 ?. 앞이 null이나 undefine일 경우 error 대신 undefined 반환.
  return (
    error?.statusCode !== undefined &&
    error?.message !== undefined &&
    error?.name !== undefined
  );
};

export const extractError = (error: any): AppError => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (isAppError(data)) {
      return data;
    }
  }
  return {
    statusCode: 500,
    message: 'Unknown Error',
    name: 'UnknownError',
  };
};
