import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('Teachers')
export class Teachers extends Audit{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    first_name: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    last_name: string;

    @Column({type: 'bit', default: '1'})
    is_enabled: boolean;
}