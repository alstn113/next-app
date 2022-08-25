import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { FindPostQueryDto } from './dto/find-post-query.dto';

@Controller('/post')
@ApiTags('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get('/')
  async getPostsByQueries(@Query() query: FindPostQueryDto) {
    return await this.postService.findPostsByQuries(query);
  }

  @Public()
  @Get('/search')
  async searchPosts(@Query('keyword') keyword?: string) {
    return await this.postService.searchPosts(keyword);
  }

  @Public()
  @Get('/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return await this.postService.findPostBySlug(slug);
  }

  @Post('/')
  async createPost(
    @GetCurrentUserId() userId: string,
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.createPost(userId, dto);
  }

  @Post('/:postId/likes')
  async likePost(
    @GetCurrentUserId() userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postService.likePost({ userId, postId });
  }

  @Delete('/:postId/likes')
  async unlikePost(
    @GetCurrentUserId() userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postService.unlikePost({ userId, postId });
  }

  @Delete('/:postId')
  async deletePost(
    @GetCurrentUserId() userId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postService.deletePost({ userId, postId });
  }
}
