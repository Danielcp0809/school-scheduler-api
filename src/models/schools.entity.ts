import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Entity } from "typeorm";
import { Teacher } from "./teachers.entity";
import { User } from "./users.entity";
import { Course } from "./courses.entity";

@Entity('Schools')
export class School extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 'max', nullable: true })
    address: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    phone: string;

    @Column({ type: 'bit', default: 1 })
    is_new: boolean;

    @Column({ type: 'int', default: 1 })
    onboarding_step: number;

    @Column({ type: 'bit', default: 1 })
    is_enabled: boolean;

    @OneToMany(() => Teacher, (teacher) => teacher.school)
    teachers: Teacher[];

    @OneToMany(() => User, (user) => user.school)
    users: User[];

    @OneToMany(() => Course, (course) => course.school)
    courses: Course[];
}