import { Controller, Post } from '@nestjs/common';

@Controller('teachers')
export class TeachersController {
    @Post()
    createTeacher() {
        return 'Create Teacher';
    }
}
