import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsRequestDto {
  @ApiProperty()
  postId: string;
}
