import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();

    const parentComment = parentCommentId ? await this.getComment(parentCommentId) : null;

    let comment: Prisma.CommentCreateManyInput;
    comment.text = text;
    comment.postId = postId;
    comment.userId = userId;
    comment.parentCommentId = parentComment?.id;

    if (parentComment) {
      comment.level = parentComment.level += 1;
      if (comment.level >= 3) {
        throw new HttpException('댓글은 3층까지만 가능합니다.', 400);
      }

      const subCommentsCount = await this.prisma.comment.count({
        where: {
          parentCommentId: parentComment.id,
        },
      });

      await this.prisma.comment.update({
        data: {
          subCommentsCount,
        },
        where: {
          id: parentComment.id,
        },
      });
    }
    const createComment = await this.prisma.comment.create({ data: comment });
    await this.updatePostCommentsCount(postId);
    return createComment;
  }

  async updatePostCommentsCount(postId: string) {
    const commentsCount = await this.prisma.post.count({
      where: {
        id: postId,
      },
    });
    await this.prisma.postStats.update({
      data: { commentsCount },
      where: {
        postId,
      },
    });

    return commentsCount;
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

  async updateCommentLikes(commentId: string) {
    const commentLikes = await this.prisma.commentLike.count({
      where: {
        commentId,
      },
    });
    await this.prisma.comment.update({
      data: { likes: commentLikes },
      where: { id: commentId },
    });

    return commentLikes;
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

    const commentLikes = await this.updateCommentLikes(commentId);
    return commentLikes;
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

    const commentLikes = await this.updateCommentLikes(commentId);
    return commentLikes;
  }
}

interface CommentActionParams {
  userId: string;
  commentId: string;
}
