import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { RegisterRequestDto, LoginRequestDto } from './dto';
import { Response } from 'express';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ): Promise<void> {
    return await this.authService.login(res, dto);
  }

  @Public()
  @Post('/register')
  async register(@Body() dto: RegisterRequestDto): Promise<void> {
    return await this.authService.register(dto);
  }

  @Delete('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    await this.authService.logout(userId);
    this.authService.clearTokenCookies(res);
  }
}
