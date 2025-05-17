import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PostService, PrismaService],
  controllers: [PostController],
})
export class PostModule {}
