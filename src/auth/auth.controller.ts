import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() req: CreateUserDto) {
        return this.authService.register(req)
    }

    @Post('login')
    login(@Body() req: LoginDto) {
        return this.authService.login(req)
    }
}
