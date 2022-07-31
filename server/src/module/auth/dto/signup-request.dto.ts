import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
