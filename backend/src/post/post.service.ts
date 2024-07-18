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

    //特定のuserIdから投稿文を取得
    async getUserPost(userId:number){
        const userPost = await this.prismaService.post.findMany({
            where:{userId: userId},
            select:{
                id:false,
                content: true,
                createdAt: true,
                updatedAt:false,
                userId:true,
            },
        })
        return userPost;
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

    async deletePost(postId:number){
        const deleteUserId = await this.prismaService.post.delete({
            where:{id: postId},
            //select:{userId:true},//こんなのない
        })
        return deleteUserId;
        }

}
