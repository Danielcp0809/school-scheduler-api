import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Hour } from 'src/models/hours.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Hour, Subject])
    ]
})
export class HoursModule {}
