import { Injectable } from '@nestjs/common';
import { AppErrorException } from 'src/common/exception/error.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
      },
    });
    if (!user) throw new AppErrorException('NotFound');
    return user;
  }
}
