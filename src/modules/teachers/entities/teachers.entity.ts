import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('Teachers')
export class Teachers{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    first_name: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    last_name: string;
}