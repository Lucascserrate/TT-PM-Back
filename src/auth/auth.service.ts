import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserError } from 'src/user/exceptions/user.enum';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) { }
    async register(req: CreateUserDto) {
        try {
            const userFound = await this.userService.findByEmail(req.email)
            if (userFound) throw new HttpException(UserError.ALREADY_EXISTS, HttpStatus.CONFLICT)
            return await this.userService.create(req)
        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    login() {
        return 'login'
    }
}
