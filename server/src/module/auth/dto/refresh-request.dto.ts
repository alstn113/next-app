import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequestDto {
  @ApiProperty()
  refresh_token: string;
}
