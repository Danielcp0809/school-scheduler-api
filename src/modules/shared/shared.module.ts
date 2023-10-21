import { Global, Module } from '@nestjs/common';
import { Database } from './database/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import typeorm from '../../config/typeorm';

const environment = process.env.NODE_ENV || 'development'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [typeorm]
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
        }),
      ],
    providers: [
        Database,
        {
            provide: 'ENVIRONMENT',
            useValue: environment,
        },
    ],
    exports: [
        Database,
        TypeOrmModule,
        'ENVIRONMENT'
    ]
})
export class SharedModule { }
