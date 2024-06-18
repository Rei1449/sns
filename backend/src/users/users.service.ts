import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    
    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }
    
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createOne(dto: CreateUserDto): Promise<User> {
        // let inputData: Promise<User> = dto;
        // (await inputData).createdAt = 
        dto.createdAt = new Date();
        dto.updatedAt = new Date();
        console.log(dto);
        return await this.usersRepository.save(dto);
    }

    // async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //     return this.prisma.user.create({
    //         data,
    //     });
    // }


    async createMany(users: User[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);
        
            await queryRunner.commitTransaction();
        } catch (err) {
          // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
          // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }
}

