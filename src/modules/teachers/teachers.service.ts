import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from 'src/validators/teachers.dto';

@Injectable()
export class TeachersService {
    
    updateTeacher(id: string, body: UpdateProductDto) {
        const teacher = false;
        if(!teacher) throw new NotFoundException('Teacher not found')
        return {
            id,
            body
        }
    }

}
