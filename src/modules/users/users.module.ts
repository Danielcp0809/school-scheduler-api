import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from '../../models/credentials.entity';
import { Teacher } from 'src/models/teachers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials, Teacher])],
  controllers: [UsersController]
})
export class UsersModule {}
