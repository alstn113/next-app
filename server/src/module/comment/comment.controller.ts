import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/comment')
@ApiTags('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get('/post/:slug')
  async getComments(@Param('slug') slug: string) {
    return await this.commentService.findComments(slug);
  }

  @Public()
  @Get('/:commentId')
  async getComment(@Param('commentId') commentId: string) {
    return await this.commentService.findComment(commentId);
  }

  @Post('/')
  async createComment(
    @GetCurrentUserId() userId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(userId, dto);
  }

  @Delete('/:commentId')
  async deleteComment(
    @GetCurrentUserId() userId: string,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentService.deleteComment({ userId, commentId });
  }

  @Post('/:commentId/likes')
  async likeComment(
    @GetCurrentUserId() userId: string,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentService.likeComment({ userId, commentId });
  }

  @Delete('/:commentId/likes')
  async unlikeComment(
    @GetCurrentUserId() userId: string,
    @Param('commentId') commentId: string,
  ) {
    return await this.commentService.unlikeComment({ userId, commentId });
  }
}
