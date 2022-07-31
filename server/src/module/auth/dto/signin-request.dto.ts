import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
