import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    content: string

    @IsString()
    @IsNotEmpty()
    createdAt: Date

    @IsString()
    @IsNotEmpty()
    updatedAt: Date

    @IsNotEmpty()
    userId: number
}