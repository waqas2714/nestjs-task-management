import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('/tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {} 

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto:TasksFilterDto):Task[]{
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    } 

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto:CreateTaskDto 
    ):Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id:string
    ){
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status', TaskValidationPipe) status:TaskStatus
    ):Task{
        return this.tasksService.updateTaskStatus(id, status);
    }
}
