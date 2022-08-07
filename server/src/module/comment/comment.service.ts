import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(userId: string, postId: string, dto: CreateCommentDto) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) throw new NotFoundException();
    return await this.prismaService.comment.create({
      data: { ...dto, postId, userId },
    });
  }

  async deleteComment(userId: string, id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException();
    if (comment.userId !== userId) throw new UnauthorizedException();
    return await this.prismaService.comment.delete({
      where: { id },
    });
  }
}
