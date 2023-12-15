import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from 'src/models/settings.entity';
import { SchoolsService } from 'src/modules/schools/services/schools.service';
import { CreateSettingsDto } from 'src/validators/settings.dto';
import { FiltersTeachersDto } from 'src/validators/teachers.dto';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class SettingsService {

    constructor(
      @InjectRepository(Settings) private settingsRepository: Repository<Settings>,
      private schoolService: SchoolsService
    ){}

    async getAllSettings(params: FiltersTeachersDto, schoolId: string) {
        const { limit, offset, search } = params;
        let where: FindOptionsWhere<Settings>[] = [];
        if (search) {
            where.push({ name: Like(`%${search}%`) })
        }
        where = where.map((item) => {
            return {...item, school_id: schoolId}
        })
        return await this.settingsRepository.find({
            take: limit ?? 10,
            skip: offset ?? 0,
            where,
            relations: ['breaks'],
            select: {
                id: true,
                name: true,
                start_day_time: true,
                end_day_time: true,
                breaks: {
                    id: true,
                    name: true,
                    start_time: true,
                    end_time: true,
                }
            },
        });
    }

    async createSetting(body: CreateSettingsDto, schoolId: string) {
        const school = await this.schoolService.getSchoolById(schoolId);
        if(!school) throw new NotFoundException('School not found');
        const newSetting = this.settingsRepository.create({
            ...body,
            school
        });
        return await this.settingsRepository.save(newSetting);
    }

}
