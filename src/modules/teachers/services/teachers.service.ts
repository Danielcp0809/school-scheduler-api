import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/modules/shared/database/database';
import { UpdateProductDto } from 'src/validators/teachers.dto';

@Injectable()
export class TeachersService {

    constructor(
        @Inject('ENVIRONMENT') private environment: string,
        private databaseProvider: Database,
    ) {}
    
    updateTeacher(id: string, body: UpdateProductDto) {
        this.databaseProvider.startConnection();
        const teacher = true;
        if(!teacher) throw new NotFoundException('Teacher not found')
        return {
            environment: this.environment,
            id,
            body
        }
    }

}
