import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TaskStatus } from './task.enum';

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsNumber()
    projectId: number;
}