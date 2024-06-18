import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    email: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string

    @IsString()
    @IsNotEmpty()
    createdAt: Date

    @IsString()
    @IsNotEmpty()
    updatedAt: Date
}