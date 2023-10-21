import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from "typeorm";
import { Credentials } from "../../users/entities/credentials.entity";
import { Teacher } from "src/modules/teachers/entities/teachers.entity";

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

    @OneToOne(() => Credentials, (credentials) => credentials.user, { nullable: true })
    credentials: Credentials;

    @OneToOne(() => Teacher, (teacher) => teacher.user, { nullable: true })
    @JoinColumn({name: 'teacher_id'})
    teacher: Teacher;
}