import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import config from './config/config';
import { configValidationSchema } from './enviroments.validator';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { HoursModule } from './modules/hours/hours.module';
import { CoursesModule } from './modules/courses/courses.module';
@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    TeachersModule, 
    SharedModule, UsersModule, SchoolsModule, SubjectsModule, HoursModule, CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
