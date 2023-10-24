import { Module } from '@nestjs/common';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../../models/teachers.entity';
import { Subject } from 'rxjs';
@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
