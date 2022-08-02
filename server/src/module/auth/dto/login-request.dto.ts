import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
