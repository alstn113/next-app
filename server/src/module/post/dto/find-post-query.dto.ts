import { ApiProperty } from '@nestjs/swagger';

export class FindPostQueryDto {
  @ApiProperty({ nullable: true })
  cursor?: string;
}
