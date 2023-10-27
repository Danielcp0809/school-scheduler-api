import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubjectsService } from '../services/subjects.service';
import { ValidatePayloadExistsPipe } from 'src/pipes/payload-exist/payload-exist.pipe';
import { CreateSubjectDto, UpdateSubjectDto } from 'src/validators/subjects.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Subject')
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {

    constructor(private subjectService: SubjectsService){}

    @Get()
    @ApiOperation({ summary: 'Get the list of a subjects' })
    getSubjects() {
        return this.subjectService.getAllSubjects();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new subject' })
    createSubject(@Body() body: CreateSubjectDto) {
        return this.subjectService.createSubject(body);
    }

    @Put(':id')
    @UsePipes(new ValidatePayloadExistsPipe())
    @ApiOperation({ summary: 'Update a subject' })
    updateTeacher(@Body() body: UpdateSubjectDto, @Param('id') id: string) {
        return this.subjectService.updateSubject(id, body)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a subject information' })
    getSubject(@Param('id') id: string) {
        return this.subjectService.getSubject(id);
    }

    @Delete(':id/teacher/:teacherId')
    @ApiOperation({ summary: 'Delete a teacher from a subject' })
    deleteTeacherFromSubject(@Param('id') id: string, @Param('teacherId') teacherId: string) {
        return this.subjectService.removeTeacherFromSubject(id, teacherId);
    }

    @Put(':id/teacher/:teacherId')
    @ApiOperation({ summary: 'Add a teacher to a subject' })
    addTeacherToSubject(@Param('id') id: string, @Param('teacherId') teacherId: string) {
        return this.subjectService.addTeacherToSubject(id, teacherId);
    }
}
