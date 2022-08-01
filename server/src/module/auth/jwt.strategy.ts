import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './types';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // default
      secretOrKey: configService.get<string>('auth.access_token_secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });
    if (!user) throw new HttpException('권한이 없습니다.', 401);
    return payload;

    //payload는 jwt token decode 한 것
  } // req.user에 저장
}
