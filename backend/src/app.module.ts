import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { HttpModule } from '@nestjs/axios';  // APIクライアント
import { ConfigModule } from '@nestjs/config';  // envファイル関連

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PostModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true, // 全体で使えるようにする
      envFilePath: '.env', // デフォルトなので省略も可
    }),
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
