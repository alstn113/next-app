import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('/auth')
@ApiTags('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin/local')
  async signinLocal() {
    return;
  }

  @Post('/signup/local')
  async signupLocal() {
    return;
  }

  @Post('/refresh')
  async refreshTokens() {
    return;
  }

  @Post('/logout')
  async logout() {
    return;
  }
}
