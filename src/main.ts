import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('School Scheduler API')
    .setDescription('System to manage teachers, courses classes of a school to make schedules')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Enable validations globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions:{
      enableImplicitConversion: true // Convert query params to their respective types
    }
  }))

  app.enableCors();
  await app.listen(process.env.APP_PORT || 3030);
}
bootstrap();
