import { Module } from '@nestjs/common';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../../models/teachers.entity';
import { Credentials } from '../../models/credentials.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
