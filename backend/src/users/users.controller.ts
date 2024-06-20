import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { GetUserDto } from 'src/dto/get-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/all')
    findAll(): Promise<GetUserDto []> {
        return this.usersService.findAll();
    }

    @Get('/')
    findOne(@Query('id') id: number): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Post()
    async createOne(@Body() dto: CreateUserDto): Promise<User> {
        try {
            return await this.usersService.createOne(dto);
        } catch (err) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
