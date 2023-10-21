import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto, UpdateProductDto } from 'src/validators/teachers.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';

@ApiTags('Teacher')
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Get()
    @ApiOperation({ summary: 'Get the list of a teachers' })
    getTeachers() {
        return this.teacherService.getAllTeachers();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new teacher' })
    createTeacher(@Body() body: CreateTeacherDto) {
        return this.teacherService.createTeacher(body);
    }

    @Put(':id')
    @UsePipes(new ValidatePayloadExistsPipe())
    @ApiOperation({ summary: 'Update a teacher' })
    updateTeacher(@Body() body: UpdateProductDto, @Param('id') id: string) {
        return this.teacherService.updateTeacher(id, body)
    }
}
