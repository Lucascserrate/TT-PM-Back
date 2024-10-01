import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectError } from './exceptions/project.enum';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>) { }

    findAll() {
        try {
            return this.projectRepository.find();
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_FETCHING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    findOne(id: number) {
        try {
            const projectFound = this.projectRepository.findOneBy({ id });
            if (!projectFound) return new HttpException(ProjectError.NOT_FOUND, HttpStatus.NOT_FOUND);
            return projectFound;
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_FETCHING_ONE,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    create(project: CreateProjectDto): Promise<ProjectEntity> {
        try {
            const newProject = this.projectRepository.create(project);
            return this.projectRepository.save(newProject);
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_CREATING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: number, project: UpdateProjectDto) {
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
            if (res.affected === 0) return new HttpException('Project not found', HttpStatus.NOT_FOUND);

            return res;
        } catch (error) {
            throw new HttpException(
                ProjectError.SOMETHING_WENT_WRONG_DELETING,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }
}
