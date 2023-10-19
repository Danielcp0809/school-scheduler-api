import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './modules/teachers/teachers.module';

const environment = process.env.NODE_ENV || 'development'
@Module({ 
  imports: [TeachersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ENVIRONMENT',
      useValue: environment,
    }
  ],
})
export class AppModule { }
