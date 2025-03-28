import { Injectable } from '@nestjs/common';
import { createPostDTO } from 'src/dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUserInfo } from 'src/types/user';

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async getAllPost(){
        const post = await this.prismaService.post.findMany({})
        return post;
    }

    async getNew30Post(){
        const post = await this.prismaService.post.findMany({take:30})
        return post;
    }

    async getUserPost(userId:number){
        const userPost = await this.prismaService.post.findMany({
            where:{userId: userId},
            select:{
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
            },
        })
        return userPost;
    }


    async createPost(reatePostDTO:createPostDTO, userData: ReqUserInfo){
        
        const newPost = await this.prismaService.post.create({
            data:{
                content: reatePostDTO.content,
                userId: userData.id,
            },
        });
        return newPost;
    }

    async deletePost(postId:number){
        const deleteUserId = await this.prismaService.post.delete({
            where:{id: postId},
            //select:{userId:true},
        })
        return deleteUserId;
        }

}
