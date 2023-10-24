import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { Teacher } from "src/models/teachers.entity";
import { Credentials } from "./credentials.entity";
import { School } from "./schools.entity";

@Entity('Users')
export class User extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ type: 'bit', default: 0 })
    is_enabled: boolean;

    @OneToOne(() => Credentials, (credentials) => credentials.user)
    credentials: Credentials;

    @OneToOne(() => Teacher, (teacher) => teacher.user, { nullable: true })
    @JoinColumn({name: 'teacher_id'})
    teacher: Teacher;

    @ManyToOne(() => School, (school) => school.users, { nullable: true })
    @JoinColumn({name: 'school_id'})
    school: School;
}