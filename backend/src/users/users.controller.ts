import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createAccountDTO } from 'src/dto/account.dto';
import { JwtPayload } from 'src/types/user';
import { followUserDTO } from 'src/dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';

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

    @Post('/follow')
    @UseGuards(AuthGuard) // 認証チェック
    async followUser(@Request() req: JwtPayload, @Body() followUserDTO: followUserDTO){
        const user = req.user; // トークンから取得したユーザー情報
        const data = await this.usersService.followUser(user, followUserDTO);
        return data;
    }

    @Post('/unfollow')
    @UseGuards(AuthGuard) // 認証チェック
    async unFollowUser(@Request() req: JwtPayload, @Body() followUserDTO: followUserDTO){
        const user = req.user; // トークンから取得したユーザー情報
        const data = await this.usersService.unFollowUser(user, followUserDTO);
        return data;
    }
}
