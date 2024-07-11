import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createAccountDTO } from 'src/dto/account.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    createAccount(@Body() createAccountDTO:createAccountDTO){
        return this.usersService.createAccount(createAccountDTO.name,createAccountDTO.email,createAccountDTO.password);
    }
}
