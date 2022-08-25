import { AxiosError } from 'axios';

//임시 에러
export interface CustomAxiosError
  extends AxiosError<{ message: string; statusCode: number }> {}
