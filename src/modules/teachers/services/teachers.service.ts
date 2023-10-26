import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeacherDto, FiltersTeachersDto, UpdateTeacherDto } from 'src/validators/teachers.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { isUUID } from 'class-validator';
import { Teacher } from 'src/models/teachers.entity';

@Injectable()
export class TeachersService {

    constructor(
        @Inject('ENVIRONMENT') private environment: string,
        @InjectRepository(Teacher) private teachersRepository: Repository<Teacher>,
    ) {}

    async getAllTeachers(params: FiltersTeachersDto) {
        const { limit, offset, search } = params;
        let where: FindOptionsWhere<Teacher>[] = [];
        if (search) {
            where.push({ first_name: Like(`%${search}%`) })
            where.push({ last_name: Like(`%${search}%`) })
        }
        if(where.length === 0){
            where.push({ is_enabled: true})
        }else {
            where = where.map((item) => {
                return {...item, is_enabled: true}
            })
        }
        return await this.teachersRepository.find({
            take: limit ?? 10,
            skip: offset ?? 0,
            where
        });
    }

    async createTeacher(body: CreateTeacherDto) {
        const newTeacher = this.teachersRepository.create(body);
        return await this.teachersRepository.save(newTeacher);
    }
    
    async updateTeacher(id: string, body: UpdateTeacherDto) {
        if (!isUUID(id)) throw new BadRequestException('Id has an invalid UUID format');
        let teacher = await this.teachersRepository.findOneBy({ id })
        if(!teacher) throw new NotFoundException('Teacher not found')
        return await this.teachersRepository.merge(teacher, body);
    }

}
