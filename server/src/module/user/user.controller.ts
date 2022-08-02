import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { UserResponseDto } from './dto/user-response';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getCurrentUser(
    @GetCurrentUserId() userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getCurrentUser(userId);
  }
}
