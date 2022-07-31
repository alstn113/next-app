import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getCurrentUser(@GetCurrentUserId() userId: string) {
    return await this.userService.getCurrentUser(userId);
  }
}
