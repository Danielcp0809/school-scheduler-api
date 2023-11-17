import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { School } from 'src/models/schools.entity';
import { UpdateSchoolDto } from 'src/validators/schools.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolsService {
    
    constructor(
        @InjectRepository(School) private schoolRepository: Repository<School>,
    ) {}

    async updateSchool(id: string, body: UpdateSchoolDto) {
        if (!isUUID(id)) throw new BadRequestException('Id has an invalid UUID format');
        let school = await this.schoolRepository.findOneBy({ id })
        if(!school) throw new NotFoundException('School not found')
        school = this.schoolRepository.merge(school, body);
        return await this.schoolRepository.save(school);
    }
}
