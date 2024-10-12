import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserError } from 'src/user/exceptions/user.enum';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    async register(req: CreateUserDto) {
        try {
            const userFound = await this.userService.findByEmail(req.email)
            if (userFound) throw new HttpException(UserError.ALREADY_EXISTS, HttpStatus.CONFLICT)
            return await this.userService.create({
                ...req,
                password: await bcrypt.hash(req.password, 10)
            })
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    async login({ email, password }: LoginDto) {
        const userFound = await this.userService.findByEmail(email)
        if (!userFound) throw new HttpException("Email is wrong", HttpStatus.UNAUTHORIZED)

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) throw new HttpException("Password is wrong", HttpStatus.UNAUTHORIZED)

        const payload = { email: userFound.email }

        const token = await this.jwtService.signAsync(payload)

        return { user: userFound, access_token: token }
    }
}
