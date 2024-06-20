import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { PostType } from 'src/interfaces/post.interfaces';
import { DataSource, Repository, createQueryBuilder } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        // private usersRepository: Repository<User>,
    ) {}

    findAll() {
        return this.postsRepository.find();
    }

    async findPostedPost(id:number):Promise<Post []>{
        const posts = this.postsRepository.find({
            where: {
                userId: id
            }
        })
        return posts;
    }

    async createPost(dto: CreatePostDto): Promise<Post> {
        dto.createdAt = new Date();
        dto.updatedAt = new Date();
        return await this.postsRepository.save(dto);
    }
}
