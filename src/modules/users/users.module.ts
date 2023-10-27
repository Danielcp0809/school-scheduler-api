import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from '../../models/credentials.entity';
import { Teacher } from 'src/models/teachers.entity';
import { UsersService } from './services/users.service';
import { User } from 'src/models/users.entity';
import { School } from 'src/models/schools.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials, User, School])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
