import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppErrorException, errors } from '../exception/error.exception';

@Catch(HttpException)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: AppErrorException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof AppErrorException) {
      return response.status(status).json(exception.getResponse());
    }

    const errorName = 'Unknown';
    const errorInfo = errors[errorName];
    return response.status(errorInfo.statusCode).json({
      statusCode: errorInfo.statusCode,
      name: errorName,
      message: errorInfo.message,
    });
  }
}
