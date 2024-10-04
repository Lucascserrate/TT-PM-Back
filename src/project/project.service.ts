import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectError } from './exceptions/project.enum';
import { UserEntity } from 'src/user/user.entity';
import { UserError } from 'src/user/exceptions/user.enum';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/dto/user.enum';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        private userRepository: UserService
    ) { }

    findAll() {
        try {
            return this.projectRepository.find({ relations: ['user'] });
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_FETCHING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    findOne(id: number) {
        try {
            const projectFound = this.projectRepository.findOne({ where: { id }, relations: ['tasks'] });
            if (!projectFound) throw new HttpException(ProjectError.NOT_FOUND, HttpStatus.NOT_FOUND);
            return projectFound;
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_FETCHING_ONE,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async create(project: CreateProjectDto, id: number): Promise<ProjectEntity> {
        try {
            const userFound: UserEntity = await this.userRepository.findOne(id);
            if (!userFound) {
                throw new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            if (userFound.role === Role.ADMIN) {
                if (project.userId) {
                    const user = await this.userRepository.findOne(project.userId);
                    if (!user) throw new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);
                    const newProject = this.projectRepository.create({ ...project, user: user })
                    return this.projectRepository.save(newProject);
                }
                const newProject = this.projectRepository.create(project);
                return this.projectRepository.save(newProject);
            } else {
                throw new HttpException(UserError.INSUFFICIENT_PERMISSIONS, HttpStatus.FORBIDDEN);
            }
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: number, project: UpdateProjectDto) {
        try {
            const projectFound = await this.projectRepository.findOne({ where: { id } });
            if (!projectFound) return new HttpException(ProjectError.NOT_FOUND, HttpStatus.NOT_FOUND);

            if (project.userId) {
                const userFound = await this.userRepository.findOne(project.userId);
                if (!userFound) return new HttpException(UserError.NOT_FOUND, HttpStatus.NOT_FOUND);
                projectFound.user = userFound;
            }

            projectFound.name = project.name || projectFound.name;
            projectFound.description = project.description || projectFound.description;
            projectFound.initialDate = project.initialDate || projectFound.initialDate;
            projectFound.finalDate = project.finalDate || projectFound.finalDate;

            return this.projectRepository.save(projectFound);
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_UPDATING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async partialUpdate(id: number, project: Partial<ProjectEntity>) {
        try {
            const projectFound = await this.projectRepository.findOne({ where: { id } });
            if (!projectFound) return new HttpException(ProjectError.NOT_FOUND, HttpStatus.NOT_FOUND);
            const updateProject = Object.assign(projectFound, project);
            return this.projectRepository.save(updateProject);
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_UPDATING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async remove(id: number) {
        try {
            const res = await this.projectRepository.delete(id);
            if (res.affected === 0) return new HttpException(ProjectError.NOT_FOUND, HttpStatus.NOT_FOUND);

            return res;
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_DELETING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }
}
