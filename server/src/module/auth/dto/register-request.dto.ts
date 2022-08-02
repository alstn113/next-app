import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
