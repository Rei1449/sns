import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string, user_id: number, name: string, createdAt: Date, updatedAt: Date }> {
        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
            // throw new UnauthorizedException();
            throw new UnauthorizedException("パスワードとアカウントが一致しませんでした。");
            // throw new Error("不一致");
        }
        console.log(user);
        const payload = { id: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user_id: user.id,
            name: user.name,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}
