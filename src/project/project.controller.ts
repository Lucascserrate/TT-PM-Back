import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './project.entity';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.projectService.findOne(id);
    }

    @Post()
    create(@Body() project: CreateProjectDto): Promise<ProjectEntity> {
        return this.projectService.create(project);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() project: CreateProjectDto) {
        return this.projectService.update(id, project);
    }

    @Patch(':id')
    partialUpdate(@Param('id') id: number, @Body() project: Partial<ProjectEntity>) {
        return this.projectService.update(id, project);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.projectService.remove(id);
    }
}
