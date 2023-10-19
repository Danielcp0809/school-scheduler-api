import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SharedModule } from './modules/shared/shared.module';
@Module({ 
  imports: [TeachersModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
