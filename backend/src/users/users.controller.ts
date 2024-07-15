import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { createAccountDTO } from 'src/dto/account.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    createAccount(@Body() createAccountDTO:createAccountDTO){
        return this.usersService.createAccount(createAccountDTO.name,createAccountDTO.email,createAccountDTO.password);
    }

    @Get('/profile')
    getUserProfile(@Query('id') id:string){
        return this.usersService.getUserProfile(Number(id));
    }
}
