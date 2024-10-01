import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from './user.enum';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}