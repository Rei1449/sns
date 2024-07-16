import { Injectable } from '@nestjs/common';
import { createPostDTO } from 'src/dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async getAllPost(){
        const post = await this.prismaService.post.findMany({})
        return post;
    }

    async createPost(reatePostDTO:createPostDTO){
        const newPost = await this.prismaService.post.create({
            data:{
                content: reatePostDTO.content,
                userId: reatePostDTO.userId,
            },
        });
        return newPost;
    }


}
