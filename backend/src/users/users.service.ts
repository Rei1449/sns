import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService
    ) {}

    async createAccount(name:string, email:string, password: string){
        const isUser = this.prismaService.user.findUnique({
            where: {email: email}
        });
        // if (isUser == null) {
            const result = await this.prismaService.user.create({
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
        // const user = await this.prismaService.user.findMany();
        const user = await this.prismaService.user.findUnique({
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
        const user = await this.prismaService.user.findUnique({
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
}