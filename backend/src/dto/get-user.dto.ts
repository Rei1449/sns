import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class GetUserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string

    @IsString()
    @IsNotEmpty()
    createdAt: Date

    @IsString()
    @IsNotEmpty()
    updatedAt: Date
}
