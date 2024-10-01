import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>) { }

    findAll() {
        return this.projectRepository.find();
    }

    findOne(id: number) {
        return this.projectRepository.findOneBy({ id });
    }

    create(project: CreateProjectDto): Promise<ProjectEntity> {
        const newProject = this.projectRepository.create(project);
        return this.projectRepository.save(newProject);
    }

    async update(id: number, project: UpdateProjectDto) {
        const projectFound = await this.projectRepository.findOne({ where: { id } });

        if (!projectFound) return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        const updateProject = Object.assign(projectFound, project);
        return this.projectRepository.save(updateProject);
    }

    async partialUpdate(id: number, project: Partial<ProjectEntity>) {
        const projectFound = await this.projectRepository.findOne({ where: { id } });
        if (!projectFound) return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        const updateProject = Object.assign(projectFound, project);
        return this.projectRepository.save(updateProject);
    }

    async remove(id: number) {
        const res = await this.projectRepository.delete(id);
        if (res.affected === 0) return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        return res;
    }
}
