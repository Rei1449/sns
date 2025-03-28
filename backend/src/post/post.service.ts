import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async deletePost(postId:number, userId:number){
        // データがあるかチェック
        const post = await this.prismaService.post.findFirst({
            where: {id: postId}
        })
        if (!post) {
            throw new NotFoundException("カスタムエラー:投稿がありません");
        }
        if (post.userId != userId) {
            throw new ForbiddenException("カスタムエラー:userが一致しません");
        }

        const deleteUserId = await this.prismaService.post.delete({
            where:{id: postId},
            //select:{userId:true},
        })
        return deleteUserId;
        }

}
