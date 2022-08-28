import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppErrorExceptionFilter } from './common/filter/exception.filter';
import { AuthGuard } from './common/guards/auth-guard.guard';
import configuration from './config/configuration';
import { AuthMiddleware } from './middlewares/jwt-auth.middleware';
import { AuthModule } from './module/auth/auth.module';
import { CommentModule } from './module/comment/comment.module';
import { PostModule } from './module/post/post.module';
import { TagModule } from './module/tag/tag.module';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({}),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    TagModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AppErrorExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
