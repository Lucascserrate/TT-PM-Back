import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const userFound = await this.userRepository.findOne({ where: { id } });
        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return userFound;
    }

    async create(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({ where: { email: user.email } });

        if (userFound) {
            return new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async remove(id: number) {
        const res = await this.userRepository.delete(id);

        if (res.affected === 0) return new HttpException('User not found', HttpStatus.NOT_FOUND);

        return res;
    }

    async update(id: number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({ where: { id } });

        if (!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND);

        const updatedUser = Object.assign(userFound, user);
        return this.userRepository.save(updatedUser);
    }
}
