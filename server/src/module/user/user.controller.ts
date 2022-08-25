import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { UserResponseDto } from './dto/user-response';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('/me')
  async getCurrentUser(
    @GetCurrentUserId() userId: string,
  ): Promise<UserResponseDto> {
    if (userId === undefined) return null;
    return await this.userService.findUserById(userId);
  }
}
