import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Database {
    constructor(
        private configService: ConfigService
    ){}

    startConnection() {
        const dbHost = this.configService.get<string>('DB_HOST');
        const dbPort = this.configService.get<number>('DB_PORT');
        const dbPass = this.configService.get<string>('DB_PASSWORD');
    }
}
