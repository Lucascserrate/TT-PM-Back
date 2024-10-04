import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskError } from './exceptions/task.enum';
import { TaskStatus } from './dto/task.enum';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        private projectRepository: ProjectService
    ) { }

    async findByProjectId(projectId: number) {
        const projectFound = await this.projectRepository.findOne(projectId);
        if (!projectFound) {
            throw new HttpException(TaskError.NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return projectFound.tasks;
    }

    async create(task: CreateTaskDto): Promise<TaskEntity> {
        try {
            const projectFound = await this.projectRepository.findOne(task.projectId);
            if (!task.status) {
                task.status = TaskStatus.PENDING
            }
            const newTask = this.taskRepository.create(task);
            newTask.project = projectFound;
            return this.taskRepository.save(newTask);

        } catch (error) {
            throw new HttpException(TaskError.SOMETHING_WENT_WRONG_CREATING, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, task: Partial<UpdateTaskDto>) {
        try {
            const taskFound = await this.taskRepository.findOne({ where: { id } });
            if (!taskFound)
                throw new HttpException(TaskError.NOT_FOUND, HttpStatus.NOT_FOUND);

            const updatedTask = Object.assign(taskFound, task);
            return this.taskRepository.save(updatedTask);
        } catch (error) {
            throw new HttpException(TaskError.SOMETHING_WENT_WRONG_UPDATING, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
