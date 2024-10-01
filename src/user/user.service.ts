import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserError } from './exceptions/user.enum';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    findAll() {
        try {
            return this.userRepository.find();
        } catch (error) {
            throw new HttpException(
                UserError.SOMETHING_WENT_WRONG,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(id: number) {
        try {
            const userFound = await this.userRepository.findOne({ where: { id } });
            if (!userFound) {
                throw new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            return userFound;
        } catch (error) {
            throw new HttpException(
                UserError.SOMETHING_WENT_WRONG_FETCHING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async create(user: CreateUserDto) {
        try {
            const userFound = await this.userRepository.findOne({ where: { email: user.email } });

            if (userFound) {
                return new HttpException(UserError.ALREADY_EXISTS, HttpStatus.CONFLICT);
            }
            let newUser: UserEntity = this.userRepository.create(user);
            return this.userRepository.save(newUser);
        } catch (error) {
            throw new HttpException(
                UserError.SOMETHING_WENT_WRONG_CREATING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: number) {
        try {
            const res = await this.userRepository.delete(id);

            if (res.affected === 0) return new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);

            return res;
        } catch (error) {
            throw new HttpException(
                UserError.SOMETHING_WENT_WRONG_DELETING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async update(id: number, user: UpdateUserDto) {
        try {
            const userFound = await this.userRepository.findOne({ where: { id } });

            if (!userFound) return new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);

            const updatedUser = Object.assign(userFound, user);
            return this.userRepository.save(updatedUser);
        } catch (error) {
            throw new HttpException(
                UserError.SOMETHING_WENT_WRONG_UPDATING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }
}
