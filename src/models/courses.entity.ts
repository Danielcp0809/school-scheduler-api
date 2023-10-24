import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { School } from "./schools.entity";
import { Hour } from "./hours.entity";

@Entity('Courses')
export class Course extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    section: string;

    @Column({ type: 'bit', default: 1 })
    is_enabled: boolean;

    @ManyToOne(() => School, (school) => school.courses)
    @JoinColumn({name: 'school_id'})
    school: School;

    @OneToMany(() => Hour, (hour) => hour.course)
    hours: Hour[];
}