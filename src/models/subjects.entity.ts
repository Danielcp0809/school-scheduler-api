import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teachers.entity";

@Entity('Schools')
export class Subject extends Audit{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 'max', nullable: false })
    description: string;

    @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
    color: string;

    @Column({ type: 'bit', default: 1 })
    is_enabled: boolean;

    @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
    teachers: Teacher[];
}