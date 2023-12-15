import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Settings } from "./settings.entity";

@Entity('Breaks')
export class Breaks extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100})
    name: string;

    @Column({ type: 'int' })
    start_time: number;

    @Column({ type: 'int' })
    end_time: number;

    @Column({ type: 'varchar', length: 50 })
    week_days: string;

    @Column({ type: 'int', default: 0 })
    every_day: boolean;

    @ManyToOne(() => Settings, (setting) => setting.breaks)
    @JoinColumn({name: 'settings_id'})
    settings: Settings;
}