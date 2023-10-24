import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/models/teachers.entity';
import { SubjectsController } from './controllers/subjects.controller';
import { SubjectsService } from './services/subjects.service';
import { Subject } from 'src/models/subjects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Teacher])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
