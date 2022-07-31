import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/module/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();
    const user = req.user as JwtPayload;
    return user.userId;
  },
);
