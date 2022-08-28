import { HttpException } from '@nestjs/common';

export const errors = {
  UserExists: {
    statusCode: 409,
    message: 'User already exists',
  },
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  AuthenticationError: {
    message: 'Invalid username or password',
    statusCode: 401,
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  RefreshFailure: {
    statusCode: 401,
    message: 'Failed to refresh token',
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
};

type ErrorName = keyof typeof errors;

interface ErrorPayload {
  Unauthorized: {
    isExpiredToken: boolean;
  };
  BadRequest: any;
}

type ErrorPayloadWithDefault = Omit<
  Record<ErrorName, undefined>,
  keyof ErrorPayload
> &
  ErrorPayload;

export class AppErrorException extends HttpException {
  constructor(
    public name: ErrorName,
    public payload?: ErrorPayloadWithDefault[ErrorName],
  ) {
    const errorInfo = errors[name];
    super(
      { name, message: errorInfo.message, statusCode: errorInfo.statusCode },
      errorInfo.statusCode,
    );
  }
}
