import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './entities/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  controllers: [UsersController]
})
export class UsersModule {}
