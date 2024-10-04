import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task.enum';

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;

    @IsNumber()
    projectId: number;
}