import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateTeacher } from './teachers.entity';
import { TeachersService } from './teachers.service';
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Post()
    createTeacher(@Body() body: CreateTeacher) {
        return body;
    }

    @Put(':id')
    updateTeacher(@Body() body: Partial<CreateTeacher>, @Param('id') id: string) {
        return this.teacherService.updateTeacher(id, body)
    }
}
