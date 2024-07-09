import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    constructor(private readonly prismaService: PrismaService) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
        // const user = await this.prismaService.user.findUnique({
        //     where: {email: email},
        //     select: {
        //         id: true,
        //         email: true,
        //         name: true,
        //     },
        // })
        // return user;
    }
}