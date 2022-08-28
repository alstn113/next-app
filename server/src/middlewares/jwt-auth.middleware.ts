import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AppErrorException } from 'src/common/exception/error.exception';
import { AuthService } from '../module/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async use(
    req: Request & { userId: string },
    res: Response,
    next: NextFunction,
  ) {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    try {
      if (!accessToken) throw new AppErrorException('Unauthorized');

      const accessTokenData = await this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('auth.access_token_secret'),
      });
      req.userId = accessTokenData.userId;
      const diff = accessTokenData.exp * 1000 - new Date().getTime();
      // access token의 만료시간이 30분 밑으로 남았을 때
      if (diff < 1000 * 60 * 30 && refreshToken) {
        await this.authService.refreshTokens(res, refreshToken);
      }
    } catch (e) {
      if (!refreshToken) return next();
      try {
        const userId = await this.authService.refreshTokens(res, refreshToken);
        req.userId = userId;
      } catch (e) {}
    }
    return next();
  }
}
