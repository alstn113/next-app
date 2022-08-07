import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  async createComment(
    @GetCurrentUserId() userId: string,
    @Body() dto: CreateCommentDto,
    @Param('postId') postId: string,
  ) {
    return await this.commentService.createComment(userId, postId, dto);
  }

  @Delete(':id')
  async deleteComment(
    @GetCurrentUserId() userId: string,
    @Param('id') id: string,
  ) {
    return await this.commentService.deleteComment(userId, id);
  }
}
