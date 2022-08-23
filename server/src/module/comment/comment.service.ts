import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findComments(postId: string) {
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

  async findComment(commentId: string) {
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
    const parentComment = parentCommentId ? await this.findComment(parentCommentId) : null;

    const comment: Prisma.XOR<Prisma.CommentCreateInput, Prisma.CommentUncheckedCreateInput> = {
      text,
      userId,
      postId,
      parentCommentId: parentComment?.id,
    };

    if (parentComment) {
      comment.level = parentComment.level + 1;
      if (comment.level >= 3) {
        throw new HttpException('댓글은 3계층까지만 가능합니다.', 400);
      }
    }

    const createComment = await this.prisma.comment.create({
      data: comment,
    });

    if (parentComment) {
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

    await this.updatePostCommentsCount(postId);
    return createComment;
  }

  async updatePostCommentsCount(postId: string) {
    const commentsCount = await this.prisma.comment.count({
      where: {
        postId,
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

  async deleteComment({ userId, commentId }: CommentActionParams) {
    const comment = await this.findComment(commentId);
    if (comment.userId !== userId) throw new UnauthorizedException();

    await this.prisma.comment.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: commentId,
      },
    });
  }

  async likeComment({ userId, commentId }: CommentActionParams) {
    await this.findComment(commentId);

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
    await this.findComment(commentId);

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
