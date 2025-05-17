import { Controller, Query, Get, Post, Body, HttpCode, HttpStatus, Delete, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDTO } from 'src/dto/post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from 'src/types/user';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(
    @Query('beforeId') beforeId?: string,
    @Query('beforeDate') beforeDate?: string,
    @Query('userId') userId?: string,
    @Query('prefId') prefectureId?: string,
    @Query('lat') lat?: string,
    @Query('long') long?: string,
    @Query('dist') dist?: string,
  ) {
    return this.postService.getPosts(beforeId, beforeDate, userId, prefectureId, lat, long, dist);
  }

  @Get('/follow')
  @UseGuards(AuthGuard) // 認証チェック
  async getFollowPosts(
    @Request() req: JwtPayload,
    @Query('beforeId') beforeId?: string,
    @Query('beforeDate') beforeDate?: string
  ) {
    return this.postService.getFollowPosts(req.user.id, beforeId, beforeDate);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard) // 認証チェック
  async createPost(@Body() createPostDTO: createPostDTO, @Request() req: JwtPayload){
    const user = req.user; // トークンから取得したユーザー情報
    const newPost = await this.postService.createPost(createPostDTO, user);
    return newPost;
  }

  //idがstring型注意,指定の仕方例：/?id=1
  @Delete()
  @UseGuards(AuthGuard) // 認証チェック
  deletePost(@Query('id') id:string, @Request() req: JwtPayload){
    return this.postService.deletePost(Number(id), req.user.id);
  }

  //今は全件取得だが、今後は最新３０件ずつとか、ランダム３０件ずつとかにしたい
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
