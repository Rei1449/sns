import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { createPostDTO } from 'src/dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUserInfo } from 'src/types/user';
import { HttpService } from '@nestjs/axios';  // APIクライアント
import { firstValueFrom } from 'rxjs';  // RxJS Observable → firstValueFrom()でPromise化
import { ConfigService } from '@nestjs/config';  // envファイル関連

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
        private readonly httpService: HttpService,
        private configService: ConfigService
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
        console.log("sss");
        let inputPost: any = {};
        inputPost = {
            content: reatePostDTO.content,
            userId: userData.id
        }
        if (reatePostDTO.lat && reatePostDTO.long) {
            inputPost.lat = reatePostDTO.lat;
            inputPost.long = reatePostDTO.long;
            // 緯度経度から都道府県
            // RxJS Observable → firstValueFrom()でPromise化
            const response = await firstValueFrom(
                this.httpService.get(`https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?output=json&lat=${reatePostDTO.lat}&lon=${reatePostDTO.long}&appid=${this.configService.get<string>('Yahoo_Client_Id')}`)
            );
            console.log(response.data.Feature[0]);
            console.log(response.data.Feature[0].Property.AddressElement[0]);
            // 開発ここから

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
