import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Get()
    async findOne(@Query('project_id', ParseIntPipe) id: number) {
        return this.taskService.findOne(id);
    }

    @Post()
    async create(@Body() task: CreateTaskDto): Promise<TaskEntity> {
        return this.taskService.create(task);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() task: CreateTaskDto) {
        return this.taskService.update(id, task);
    }
}
