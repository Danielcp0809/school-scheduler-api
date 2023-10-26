import { Body, Controller, Get, Param, Post, Put, Query, SetMetadata, UseGuards, UsePipes } from '@nestjs/common';
import { TeachersService } from '../services/teachers.service';
import { CreateTeacherDto, FiltersTeachersDto, UpdateTeacherDto } from 'src/validators/teachers.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Teacher') 
@UseGuards(ApiKeyGuard) // Makes all endpoints private by default
@Controller('teachers')
export class TeachersController {

    constructor(private teacherService: TeachersService){}

    @Get()
    // @Public() // Make this endpoint public
    @ApiOperation({ summary: 'Get the list of a teachers' })
    getTeachers(@Query() params: FiltersTeachersDto) {
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
