import { Global, Module } from '@nestjs/common';
import { Database } from './database/database';

const environment = process.env.NODE_ENV || 'development'

@Global()
@Module({
    providers: [
        Database,
        {
            provide: 'ENVIRONMENT',
            useValue: environment,
        },
    ],
    exports:[
        Database,
        'ENVIRONMENT'
    ]
})
export class SharedModule {}
