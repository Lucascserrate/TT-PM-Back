import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from './task.enum';

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    status: string;
}