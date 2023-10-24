import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/models/schools.entity';
import { Teacher } from 'src/models/teachers.entity';
import { User } from 'src/models/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([School, User, Teacher])],
})
export class SchoolsModule {}
