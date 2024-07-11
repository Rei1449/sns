import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    getHello():string{
        return "ハロー";
    }

    async getAllPost(){

        const post = await this.prismaService.post.findMany({})
        return post;
    }


}
