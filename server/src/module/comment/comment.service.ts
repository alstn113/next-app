import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(userId: string, dto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: { ...dto, userId },
    });
  }

  async deleteComment(userId: string, id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException();
    if (comment.userId !== userId) throw new UnauthorizedException();
    return await this.prisma.comment.delete({
      where: { id },
    });
  }
}
