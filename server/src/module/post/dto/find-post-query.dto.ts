import { ApiProperty } from '@nestjs/swagger';

export class FindPostQueryDto {
  @ApiProperty({ nullable: true })
  cursor?: string;

  @ApiProperty({ nullable: true })
  size?: number;
}
