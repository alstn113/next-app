import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsRequestDto } from './dto/get-comments-request.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments({ postId }: GetCommentsRequestDto) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
    //TODO: deleted comments 처리하기
    return comments;
  }

  async getComment(commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true },
    });
    if (!comment || comment.deletedAt) {
      throw new NotFoundException();
    }
    return comment;
  }

  async createComment(userId: string, { text, postId, parentCommentId }: CreateCommentDto) {
    const parentComment = await this.prisma.comment.findUnique({ where: { id: parentCommentId } });
    return await this.prisma.comment.create({
      data: { text, postId, userId, parentCommentId },
    });
  }

  async deleteComment({ userId, commentId }: CommentActionParams) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException();
    if (comment.userId !== userId) throw new UnauthorizedException();
    return await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  async likeComment({ userId, commentId }: CommentActionParams) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException();

    const alreadyLiked = await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: { commentId, userId },
      },
    });
    if (!alreadyLiked) {
      await this.prisma.commentLike.create({ data: { commentId, userId } });
    }
    const commentLikes = await this.prisma.commentLike.count({
      where: {
        commentId,
      },
    });
    return await this.prisma.comment.update({
      data: { likes: commentLikes },
      where: { id: commentId },
    });
  }

  async unlikeComment({ userId, commentId }: CommentActionParams) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException();

    const alreadyLiked = await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: { commentId, userId },
      },
    });
    if (alreadyLiked) {
      await this.prisma.commentLike.delete({
        where: { commentId_userId: { commentId, userId } },
      });
    }
    const commentLikes = await this.prisma.commentLike.count({
      where: {
        commentId,
      },
    });
    return await this.prisma.comment.update({
      data: { likes: commentLikes },
      where: { id: commentId },
    });
  }
}

interface CommentActionParams {
  userId: string;
  commentId: string;
}
