import { Controller, Query, Get, Post, Body, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDTO } from 'src/dto/post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Body() createPostDTO: createPostDTO){
      const newPost = await this.postService.createPost(createPostDTO);
      return newPost;
    }

    //idがstring型注意,指定の仕方例：/?id=1
    @Delete()
    deletePost(@Query('id') id:string){
        return this.postService.deletePost(Number(id));
    }

    //今は全件取得だが、今後は最新３０件ずつとか、ランダム３０件ずつとかになるらしい
    @Get('/all')
    getAllPost(){
      return this.postService.getAllPost();
    }

    //最新３０件ー＞次の３０件となるようにしたい。
    @Get('/new30')
    getNew30Post(){
      return this.postService.getNew30Post();
    }

    //idがstring型注意,指定の仕方例：user/?id=1
    @Get('/user')
    getUserPost(@Query('id') id:string){
      return this.postService.getUserPost(Number(id));
    }
    
    


}
