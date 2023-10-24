import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Subject } from 'src/models/subjects.entity';
import { Teacher } from 'src/models/teachers.entity';
import { CreateSubjectDto, UpdateSubjectDto } from 'src/validators/subjects.dto';
import { In, Repository } from 'typeorm';

@Injectable()
export class SubjectsService {

    constructor(
        @InjectRepository(Subject) private subjectsRepository: Repository<Subject>,
        @InjectRepository(Teacher) private teachersRepository: Repository<Teacher>,
    ) { }

    async getAllSubjects() {
        return await this.subjectsRepository.find();
    }

    async createSubject(body: CreateSubjectDto) {
        const newSubject = this.subjectsRepository.create(body);
        if (body.teachers_id) {
            const teachers = await this.teachersRepository.find({
                where: { id: In(body.teachers_id) }
            });
            if (teachers.length != body.teachers_id.length) throw new BadRequestException('One or more teachers id are invalid');
            newSubject.teachers = teachers;
        }
        return await this.subjectsRepository.save(newSubject);
    }

    async updateSubject(id: string, body: UpdateSubjectDto) {
        if (!isUUID(id)) throw new BadRequestException('Id has an invalid UUID format');
        let subject = await this.subjectsRepository.findOneBy({ id })
        if (!subject) throw new NotFoundException('Subject not found')
        if (body.teachers_id) {
            const teachers = await this.teachersRepository.find({
                where: { id: In(body.teachers_id) }
            });
            if (teachers.length != body.teachers_id.length) throw new BadRequestException('One or more teachers id are invalid');
            subject.teachers = teachers;
        }
        return await this.subjectsRepository.merge(subject, body);
    }

    async getSubject(id: string) {
        if (!isUUID(id)) throw new BadRequestException('Id has an invalid UUID format');
        let subject = await this.subjectsRepository.findOne({
            where: { id },
            relations: ['teachers']
        })
        if (!subject) throw new NotFoundException('Subject not found')
        return subject;
    }

    async removeTeacherFromSubject(subjectId: string, teacherId: string) {
        if (!isUUID(subjectId) || !isUUID(teacherId)) throw new BadRequestException('the ids must have UUID format');
        const subject = await this.subjectsRepository.findOne({
            where: { id: subjectId },
            relations: ['teachers']
        });
        if (!subject) throw new NotFoundException('Subject not found')
        if (!subject.teachers.some(teacher => teacher.id == teacherId)) throw new BadRequestException('The teacher is not in the subject');
        subject.teachers = subject.teachers.filter(teacher => teacher.id != teacherId);
        return this.subjectsRepository.save(subject);
    }

    async addTeacherToSubject(subjectId: string, teacherId: string) {
        if (!isUUID(subjectId) || !isUUID(teacherId)) throw new BadRequestException('the ids must have UUID format');
        const subject = await this.subjectsRepository.findOne({
            where: { id: subjectId },
            relations: ['teachers']
        });
        if (!subject) throw new NotFoundException('Subject not found')
        const teacher = await this.teachersRepository.findOne({
            where: { id: teacherId }
        });
        if (!teacher) throw new NotFoundException('Teacher not found')
        if (subject.teachers.some(teacher => teacher.id == teacherId)) throw new BadRequestException('The teacher is already in the subject');
        subject.teachers.push(teacher);
        return this.subjectsRepository.save(subject);
    }

}
