import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

const userEmail: Prisma.UserSelect = {
    email: true,
}

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        const users = await this.prismaService.user.findMany({});
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            // email: user.email,
            // password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ) {
        return this.prismaService.user.findUnique({
            where: userWhereUniqueInput,
        });
    }


}
