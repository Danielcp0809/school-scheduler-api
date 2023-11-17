import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/models/schools.entity';
import { Teacher } from 'src/models/teachers.entity';
import { User } from 'src/models/users.entity';
import { SchoolsController } from './controllers/schools.controller';
import { SchoolsService } from './services/schools.service';

@Module({
    imports: [TypeOrmModule.forFeature([School, User, Teacher])],
    controllers: [SchoolsController],
    providers: [SchoolsService],
})
export class SchoolsModule {}
