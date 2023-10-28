import { Body, Controller, Get, Param, Post, Put, Query, Req, SetMetadata, UseGuards, UsePipes } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto, FiltersTeachersDto, UpdateTeacherDto } from 'src/validators/teachers.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Teacher') 
@UseGuards(JwtAuthGuard) // Makes all endpoints private by default
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Get()
    @ApiOperation({ summary: 'Get the list of a teachers' })
    getTeachers(@Query() params: FiltersTeachersDto, @Req() req: any) {
        return this.teacherService.getAllTeachers(params);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new teacher' })
    createTeacher(@Body() body: CreateTeacherDto) {
        return this.teacherService.createTeacher(body);
    }

    @Put(':id')
    @UsePipes(new ValidatePayloadExistsPipe())
    @ApiOperation({ summary: 'Update a teacher' })
    updateTeacher(@Body() body: UpdateTeacherDto, @Param('id') id: string) {
        return this.teacherService.updateTeacher(id, body)
    }
}
