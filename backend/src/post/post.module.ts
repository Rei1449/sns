import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';

@Module({
  providers: [PostService, PrismaService, HttpService],
  controllers: [PostController],
})
export class PostModule {}
