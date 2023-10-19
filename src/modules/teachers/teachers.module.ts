import { Module } from '@nestjs/common';
import { TeachersController } from './controllers/teachers.controller';
import { TeachersService } from './services/teachers.service';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
