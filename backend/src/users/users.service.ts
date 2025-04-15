import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { followUserDTO } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUserInfo } from 'src/types/user';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    // constructor(private prisma: PrismaService) {}

    async createAccount(name:string, email:string, password: string){
        const isUser = this.prisma.user.findUnique({
            where: {email: email}
        });
        // if (isUser == null) {
            const result = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })
            const payload = { id: result.id, email: result.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
                user_id: result.id,
                name: result.name,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            };
        // } else {
        //     throw Error("既に存在するアドレスで登録しようとしています。");
        // }
    }

    async findOne(email: string): Promise<User | undefined> {
        // return this.users.find(user => user.username === username);
        // const user = await this.prisma.user.findMany();
        const user = await this.prisma.user.findUnique({
            where: {email: email},
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                createdAt: true,
                updatedAt: true
            },
        })
        return user;
    }

    async getUserProfile(id:number){
        const user = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
        })
        return user;
    }

    async isFollow(myId: number, oppId: number) {
        const isFollowd = await this.prisma.follow.findUnique({
            where: {
                unique_follow_pair: {
                    followUserId: myId,
                    followedUserId: oppId
                }
            }
        })

        return isFollowd !== null;
    }

    async followUser(userData: ReqUserInfo, followUserDTO: followUserDTO){
        // const data = await this.prisma.test.findOne({})
        const isFollow = await this.isFollow(userData.id, followUserDTO.userId);
        if (isFollow) {
            throw new HttpException(
                { message: 'すでにフォローしています(カスタムメッセージ)', statusCode: 409 },
                HttpStatus.CONFLICT,
            );
        }
        const followData = await this.prisma.follow.create({
            data: {
                followUserId: userData.id,             // ログイン中のユーザー
                followedUserId: followUserDTO.userId,  // フォローされる相手のID
            },
        });
        return followData;
    }

    async unFollowUser(userData: ReqUserInfo, followUserDTO: followUserDTO){

        return "no";
    }


}