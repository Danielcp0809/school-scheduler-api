import { Module } from '@nestjs/common';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teachers } from './entities/teachers.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Teachers])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
