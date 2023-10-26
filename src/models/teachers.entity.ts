import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, JoinColumn, ManyToMany, JoinTable, Index } from "typeorm";
import { User } from "src/models/users.entity";
import { School } from "./schools.entity";
import { Subject } from "./subjects.entity";

@Entity('Teachers')
// @Index(['first_name', 'last_name']) // This is a composite index
export class Teacher extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    last_name: string;

    @Column({ type: 'bit', default: 0 })
    is_enabled: boolean;

    @OneToOne(() => User, (user) => user.teacher, { nullable: true })
    user: User;

    @ManyToOne(() => School, (school) => school.teachers, { nullable: true })
    @JoinColumn({name: 'school_id'})
    school: School;

    @ManyToMany(() => Subject, (subject) => subject.teachers)
    @JoinTable({
        name: 'TeacherSubject',
        joinColumn: {
          name: 'teacher_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'subject_id',
          referencedColumnName: 'id',
        },
    })
    subjects: Subject[];
}