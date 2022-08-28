import { HttpException } from '@nestjs/common';

export const errors = {
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  RefreshFailure: {
    statusCode: 401,
    message: 'Failed to refresh token',
  },
  WrongCredentials: {
    statusCode: 401,
    message: 'Invalid username or password',
  },
  AuthenticationError: {
    message: 'Invalid username or password',
    statusCode: 401,
  },
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  UserExists: {
    statusCode: 409,
    message: 'User already exists',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
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
