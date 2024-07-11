import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    getHello(): string {
      return this.postService.getHello();
    }

    //次はここから。全て持ってきているが、表示できる形にして、送り届けないとダメ。

    @Get('/alldata')
    getAllPost(){
        return this.postService.getAllPost();
    }
}
