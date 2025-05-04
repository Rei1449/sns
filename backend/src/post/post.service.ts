import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createPostDTO } from 'src/dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUserInfo } from 'src/types/user';

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async getPosts(beforeId?: string, beforeDate?: string, userId?: string) {
        const whereClause: any = {};
        if (beforeId) {
            whereClause.id = { lt: Number(beforeId) };  // lteがdteだと以後 lteは以前 eを抜くとより前
        }
        if (beforeDate) {
            const parsed = new Date(beforeDate);
            if (!isNaN(parsed.getTime())) {
                whereClause.createdAt = {
                    ...(whereClause.createdAt || {}),
                    lt: parsed, //  「その日時以前」ならlte
                };
            }
        }
        if (userId) {
            whereClause.userId = Number(userId);
        }

        const posts = await this.prismaService.post.findMany({
            where: whereClause,
            orderBy: {updatedAt: 'desc'},
            take: 5,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        // email: true,
                        _count: {
                            select: {
                                followings: true,
                                followers: true
                            },
                        }
                    },
                },
            }
        })
        return posts;
    }

    async getFollowPosts(userId: number, beforeId?: string, beforeDate?: string) {
        const whereClause: any = {};
        if (beforeId) {
            whereClause.id = { lt: Number(beforeId) };  // lteがdteだと以後 lteは以前 eを抜くとより前
        }
        if (beforeDate) {
            const parsed = new Date(beforeDate);
            if (!isNaN(parsed.getTime())) {
                whereClause.createdAt = {
                    ...(whereClause.createdAt || {}),
                    lt: parsed, //  「その日時以前」ならlte
                };
            }
        }

        const followings = await this.prismaService.follow.findMany({
            where: {
              followUserId: userId, // ログイン中のユーザーID
            },
            select: {
                followedUserId: true,
            },
        });
        const followedUserIds = followings.map(f => f.followedUserId);
        whereClause.userId = {
            in: followedUserIds
        }

        const posts = await this.prismaService.post.findMany({
            where: whereClause,
            orderBy: {updatedAt: 'desc'},
            take: 5,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        // email: true,
                        _count: {
                            select: {
                                followings: true,
                                followers: true
                            },
                        }
                    },
                },
            }
        })
        return posts;
    }

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
        let inputPost: any = {};
        inputPost = {
            content: reatePostDTO.content,
            userId: userData.id
        }
        if (reatePostDTO.lat && reatePostDTO.long) {
            inputPost.lat = reatePostDTO.lat;
            inputPost.long = reatePostDTO.long;
        }
        const newPost = await this.prismaService.post.create({
            data: {
                ...inputPost
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

        const deletePost = await this.prismaService.post.delete({
            where:{id: postId},
            //select:{userId:true},
        })
        return deletePost;
        }
}
