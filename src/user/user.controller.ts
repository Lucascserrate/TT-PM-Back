import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.remove(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }
}
