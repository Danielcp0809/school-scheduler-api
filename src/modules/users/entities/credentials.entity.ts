import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('Credentials')
export class Credentials extends Audit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    username: string;

    @Column({ type: 'varchar', length: 'max', nullable: false })
    password: string;

    @Column({ type: 'bit', default: 1 })
    reset_password: boolean;

    @Column({ type: 'bit', default: 0 })
    is_admin: boolean;

    @OneToOne(() => User, (user) => user.credentials)
    @JoinColumn({name: 'user_id'})
    user: User;
}