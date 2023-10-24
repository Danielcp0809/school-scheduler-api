import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Teacher } from 'src/models/teachers.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Teacher])],
})
export class SubjectsModule {}
