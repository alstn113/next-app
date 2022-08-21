import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginRequestDto, RegisterRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtServcie: JwtService,
    private readonly configServcie: ConfigService,
  ) {}

  async login(res: Response, dto: LoginRequestDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) throw new HttpException('존재하지 않는 User입니다.', 404);
    const passwordMatches = await argon2.verify(user.password, dto.password);
    if (!passwordMatches) throw new HttpException('password가 일치하지 않습니다.', 404);
    const access_token = await this.getAccessToken(user.id);
    const refresh_token = await this.getRefreshToken(user.id);
    await this.updateRtHash(user.id, refresh_token);
    this.setTokenCookie(res, { access_token, refresh_token });
  }

  async register(dto: RegisterRequestDto): Promise<void> {
    const exUser = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (exUser) throw new HttpException('존재하는 Username입니다.', 401);
    dto.password = await argon2.hash(dto.password);
    await this.prisma.user.create({ data: dto });
    return;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(res: Response, refresh_token: string) {
    const refreshTokenData = await this.jwtServcie.verify(refresh_token, {
      secret: this.configServcie.get<string>('auth.refresh_token_secret'),
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: refreshTokenData.userId,
      },
    });
    if (!user || !user.hashedRt)
      throw new HttpException('존재하지 않는 user이거나 로그인 상태가 아닙니다', 404);

    const rtmatches = await argon2.verify(user.hashedRt, refresh_token);
    if (!rtmatches) throw new HttpException('올바르지 않은 refresh token입니다', 404);

    const now = new Date().getTime();
    const diff = refreshTokenData.exp * 1000 - now;
    // refresh token이 15일보다 적게 남았을 경우 refresh token도 갱신
    if (diff < 1000 * 60 * 60 * 24 * 15) {
      refresh_token = await this.getRefreshToken(user.id);
      await this.updateRtHash(user.id, refresh_token);
    }
    const access_token = await this.getAccessToken(user.id);
    this.setTokenCookie(res, { access_token, refresh_token });
    return user.id;
  }

  async getAccessToken(userId: string) {
    const access_token = await this.jwtServcie.signAsync(
      {
        userId,
        sub: 'access_token',
      },
      {
        secret: this.configServcie.get<string>('auth.access_token_secret'),
        expiresIn: '1h',
      },
    );
    return access_token;
  }

  async getRefreshToken(userId: string) {
    const refresh_token = await this.jwtServcie.signAsync(
      {
        userId,
        sub: 'refresh_token',
      },
      {
        secret: this.configServcie.get<string>('auth.refresh_token_secret'),
        expiresIn: '30d',
      },
    );
    return refresh_token;
  }

  async updateRtHash(userId: string, refresh_token: string) {
    const hash = await argon2.hash(refresh_token);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  setTokenCookie(res: Response, token: { access_token: string; refresh_token: string }) {
    res.cookie('access_token', token.access_token, {
      maxAge: 1000 * 60 * 60 * 1, // 1h
      httpOnly: true,
    });
    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
      httpOnly: true,
    });
  }

  clearTokenCookies(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
