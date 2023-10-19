import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacher } from './teachers.entity';
import { teacherUpdateSchema } from 'src/pipes/validator/teacher.validator';

@Injectable()
export class TeachersService {
    
    updateTeacher(id: string, body: Partial<CreateTeacher>) {
        const { error } = teacherUpdateSchema.validate(body);
        if(error) throw new BadRequestException('Validation failed: ' + error.message);
        const teacher = false;
        if(!teacher) throw new NotFoundException('Teacher not found')
        return {
            id,
            body
        }
    }

}
