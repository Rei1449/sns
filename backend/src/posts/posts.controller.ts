import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { Post as PostContent } from 'src/entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get("/all")
    findAll(){
        return this.postsService.findAll();
    }

    @Get("/")
    findPostedPost(@Query('id') userId: number){
        return this.postsService.findPostedPost(userId);
    }

    @Post()
    async createPost(@Body() dto:CreatePostDto): Promise<PostContent> {
        try {
            return await this.postsService.createPost(dto);
        } catch (err) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
