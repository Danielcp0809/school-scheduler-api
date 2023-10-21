import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from 'src/config/config';
@Injectable()
export class Database {
    constructor(
        private configService: ConfigService,
        @Inject(config.KEY) private envConfig: ConfigType<typeof config>
    ){}

    startConnection() {
        const dbHost = this.envConfig.database.host;
        const dbPort = this.envConfig.database.port;
        const dbPass = this.envConfig.database.password;
    }
}
