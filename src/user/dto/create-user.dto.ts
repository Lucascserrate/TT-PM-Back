import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from './user.enum';
import { Transform } from 'class-transformer';


export class CreateUserDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}