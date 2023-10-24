import { Audit } from "src/modules/shared/audit/audit.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subjects.entity";
import { Course } from "./courses.entity";

@Entity('Hours')
export class Hour extends Audit{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int', nullable: false })
    start_point: number;

    @Column({ type: 'int', nullable: false })
    end_point: number;

    @Column({ type: 'int', nullable: false })
    week_day: number;

    @ManyToOne(()=> Subject, (subject) => subject.hours)
    @JoinColumn({name: 'subject_id'})
    subject: Subject

    @ManyToOne(()=> Course, (course) => course.hours)
    @JoinColumn({name: 'course_id'})
    course: Course
}