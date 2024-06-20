import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]),forwardRef(() => UsersModule)],
  exports: [TypeOrmModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
