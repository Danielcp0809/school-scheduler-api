import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from 'src/validators/teachers.dto';

@Injectable()
export class TeachersService {

    constructor(@Inject('ENVIRONMENT') private environment: string) {}
    
    updateTeacher(id: string, body: UpdateProductDto) {
        const teacher = true;
        if(!teacher) throw new NotFoundException('Teacher not found')
        return {
            environment: this.environment,
            id,
            body
        }
    }

}
