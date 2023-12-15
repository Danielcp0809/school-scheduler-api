import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { School } from "./schools.entity";
import { Breaks } from "./breaks.entity";

@Entity('Settings')
export class Settings extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'int', nullable: false })
    hour_size: number;

    @Column({ type: 'int', nullable: false })
    start_day_time: number;

    @Column({ type: 'int', nullable: false })
    end_day_time: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    week_days: string;

    @ManyToOne(() => School, (school) => school.settings)
    @JoinColumn({name: 'school_id'})
    school: School;

    @OneToMany(() => Breaks, (breaks) => breaks.settings)
    breaks: Breaks[];

}