import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsRequestDto } from './dto/get-comments-request.dto';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/')
  async getComments(@Body() dto: GetCommentsRequestDto) {
    return await this.commentService.getComments(dto);
  }

  @Get('/:commentId')
  async getComment(@Param('commentId') commentId: string) {
    return await this.commentService.getComment(commentId);
  }

  @Post('/')
  async createComment(@GetCurrentUserId() userId: string, @Body() dto: CreateCommentDto) {
    return await this.commentService.createComment(userId, dto);
  }

  @Delete('/:commentId')
  async deleteComment(@GetCurrentUserId() userId: string, @Param('commentId') commentId: string) {
    return await this.commentService.deleteComment({ userId, commentId });
  }

  @Post('/:commentId/likes')
  async likeComment(@GetCurrentUserId() userId: string, @Param('commentId') commentId: string) {
    return await this.commentService.likeComment({ userId, commentId });
  }

  @Delete('/:commentId/likes')
  async unlikeComment(@GetCurrentUserId() userId: string, @Param('commentId') commentId: string) {
    return await this.commentService.unlikeComment({ userId, commentId });
  }
}
