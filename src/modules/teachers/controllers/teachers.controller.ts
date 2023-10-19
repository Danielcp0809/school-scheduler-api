import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto, UpdateProductDto } from 'src/validators/teachers.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Post()
    @ApiOperation({ summary: 'Create a new teacher' })
    createTeacher(@Body() body: CreateTeacherDto) {
        return body;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a teacher' })
    updateTeacher(@Body() body: UpdateProductDto, @Param('id') id: string) {
        return this.teacherService.updateTeacher(id, body)
    }
}
