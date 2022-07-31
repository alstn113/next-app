import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshRequestDto, SigninRequestDto, SignupRequestDto } from './dto';
import * as argon2 from 'argon2';
import { JwtPayload, TokensType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signinLocal(dto: SigninRequestDto): Promise<TokensType> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) throw new HttpException('존재하지 않는 User입니다.', 404);
    const passwordMatches = await argon2.verify(user.password, dto.password);
    if (!passwordMatches)
      throw new HttpException('password가 일치하지 않습니다.', 404);
    const tokens = await this.getTokens(user.id, user.username);

    return tokens;
  }

  async signupLocal(dto: SignupRequestDto): Promise<void> {
    const exUser = await this.prismaService.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (exUser) throw new HttpException('존재하는 Username입니다.', 401);
    dto.password = await argon2.hash(dto.password);
    await this.prismaService.user.create({ data: dto });
    return;
  }

  async refreshTokens(dto: RefreshRequestDto): Promise<TokensType> {
    const refreshTokenPayload: JwtPayload = this.jwtService.verify(
      dto.refresh_token,
      {
        secret: this.configService.get('auth.refresh_token_secret'),
      },
    );
    if (!refreshTokenPayload)
      throw new HttpException('유효하지 않은 토큰입니다.', 403);

    const user = await this.prismaService.user.findUnique({
      where: {
        id: refreshTokenPayload.userId,
      },
    });
    if (!user) throw new HttpException('존재하지 않는 유저입니다.', 401);

    const tokens = await this.getTokens(user.id, user.username);
    return tokens;
  }

  async logout() {
    return;
  }

  async getTokens(userId: string, username: string): Promise<TokensType> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          username,
          sub: 'access_token',
        },
        {
          secret: this.configService.get<string>('auth.access_token_secret'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          username,
          sub: 'refresh_token',
        },
        {
          secret: this.configService.get<string>('auth.refresh_token_secret'),
          expiresIn: '24h',
        },
      ),
    ]);
    return { access_token, refresh_token };
  }
}
