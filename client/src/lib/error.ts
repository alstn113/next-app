import { AxiosError } from 'axios';

export interface CustomAxiosError extends AxiosError<{ message: string; statusCode: number }> {}
