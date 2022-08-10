import { AxiosError } from 'axios';

export interface ICustomAxiosError
  extends AxiosError<{ message: string; statusCode: number }> {}
