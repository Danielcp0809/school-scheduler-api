import { Global, Module } from '@nestjs/common';
import { Database } from './database/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { dbEntities } from './entities';


const environment = process.env.NODE_ENV || 'development'

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { username, password, host, port, name } = configService.database;
                return {
                    type: 'mssql',
                    host,
                    port: parseInt(port, 10),
                    username,
                    password,
                    database: name,
                    options: { encrypt: false },
                    synchronize: true,
                    logging: true,
                    autoLoadEntities: true,
                    entities: dbEntities
                }
            }
        })
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
