import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import config from './config';
import { configValidationSchema } from './enviroments.validator';
@Module({ 
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    TeachersModule, 
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
