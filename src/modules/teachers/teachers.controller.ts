import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateProductDto } from 'src/validators/teachers.dto';
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Post()
    createTeacher(@Body() body: CreateTeacherDto) {
        return body;
    }

    @Put(':id')
    updateTeacher(@Body() body: UpdateProductDto, @Param('id') id: string) {
        return this.teacherService.updateTeacher(id, body)
    }
}
