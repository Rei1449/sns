import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        const users = await this.prismaService.user.findMany({});
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            // password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));
    }
}
