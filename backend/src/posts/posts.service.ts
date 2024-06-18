import { Injectable } from '@nestjs/common';
import { PostType } from 'src/interfaces/post.interfaces';

@Injectable()
export class PostsService {
    private readonly posts: PostType[] = [];

    findAll() {
        return "ピェぇえぇ！"
        // return this.posts;
    }
}
