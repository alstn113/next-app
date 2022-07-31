import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { RefreshRequestDto, SignupRequestDto } from './dto';
import { SigninRequestDto } from './dto/signin-request.dto';
import { TokensType } from './types';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signin')
  async signinLocal(@Body() dto: SigninRequestDto): Promise<TokensType> {
    return await this.authService.signinLocal(dto);
  }

  @Public()
  @Post('/signup')
  async signupLocal(@Body() dto: SignupRequestDto): Promise<void> {
    return await this.authService.signupLocal(dto);
  }

  @Public()
  @Post('/refresh')
  async refreshTokens(@Body() dto: RefreshRequestDto): Promise<TokensType> {
    return await this.authService.refreshTokens(dto);
  }

  @Public()
  @Post('/logout')
  async logout() {
    return;
  }
}
