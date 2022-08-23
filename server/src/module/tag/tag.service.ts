import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async getPostsCount(tagId: string) {
    const count = await this.prisma.postTags.count({
      where: {
        tagId,
      },
    });
    return count;
  }

  async getTagByName(name: string) {
    const tag = await this.prisma.tag.findUnique({
      where: {
        name,
      },
    });
    if (!tag) throw new NotFoundException();
    return tag;
  }
}
