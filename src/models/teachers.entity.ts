import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/models/users.entity";
import { School } from "./schools.entity";

@Entity('Teachers')
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
}