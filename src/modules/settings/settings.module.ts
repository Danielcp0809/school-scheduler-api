import { Module } from '@nestjs/common';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { SchoolsService } from '../schools/services/schools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from 'src/models/settings.entity';
import { SchoolsModule } from '../schools/schools.module';

@Module({
  imports: [TypeOrmModule.forFeature([Settings]), SchoolsModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
