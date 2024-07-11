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


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PostModule
  ],

  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
