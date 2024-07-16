import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDTO } from 'src/dto/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    getHello(): string {
      return this.postService.getHello();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() createPostDTO: createPostDTO){
      const newPost = await this.postService.createPost(createPostDTO);
      return newPost;
    }

    @Get('/allpost')
    getAllPost(){
        return this.postService.getAllPost();
    }

}
