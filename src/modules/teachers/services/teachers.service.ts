import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Database } from 'src/modules/shared/database/database';
import { CreateTeacherDto, UpdateProductDto } from 'src/validators/teachers.dto';
import { Teachers } from '../entities/teachers.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class TeachersService {

    constructor(
        @Inject('ENVIRONMENT') private environment: string,
        @InjectRepository(Teachers) private teachersRepository: Repository<Teachers>,
        private databaseProvider: Database,
    ) {}

    async getAllTeachers() {
        return await this.teachersRepository.find();
    }

    async createTeacher(body: CreateTeacherDto) {
        this.databaseProvider.startConnection();
        return await this.teachersRepository.save(body);
    }
    
    async updateTeacher(id: string, body: UpdateProductDto) {
        if (!isUUID(id)) throw new BadRequestException('Id has an invalid UUID format');
        let teacher = await this.teachersRepository.findOneBy({ id })
        if(!teacher) throw new NotFoundException('Teacher not found')
        teacher = {...teacher, ...body}
        return await this.teachersRepository.save(teacher);
    }

}
