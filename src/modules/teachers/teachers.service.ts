import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacher } from './teachers.entity';

@Injectable()
export class TeachersService {
    
    updateTeacher(id: string, body: Partial<CreateTeacher>) {
        const teacher = false;
        if(!teacher) throw new NotFoundException('Teacher not found')
        return {
            id,
            body
        }
    }

}
