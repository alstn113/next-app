import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PrismaService, PostService, CommentService],
})
export class PostModule {}
