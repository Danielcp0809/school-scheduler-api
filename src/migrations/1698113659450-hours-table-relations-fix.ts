import { MigrationInterface, QueryRunner } from "typeorm";

export class HoursTableRelationsFix1698113659450 implements MigrationInterface {
    name = 'HoursTableRelationsFix1698113659450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Hours" DROP CONSTRAINT "FK_dbb1c4b37d4629c3b9c59db8722"`);
        await queryRunner.query(`EXEC sp_rename "school-scheduler-db.dbo.Hours.subjectId", "subject_id"`);
        await queryRunner.query(`ALTER TABLE "Hours" ADD CONSTRAINT "FK_540f5c214f99ed491f4ccf2da90" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Hours" DROP CONSTRAINT "FK_540f5c214f99ed491f4ccf2da90"`);
        await queryRunner.query(`EXEC sp_rename "school-scheduler-db.dbo.Hours.subject_id", "subjectId"`);
        await queryRunner.query(`ALTER TABLE "Hours" ADD CONSTRAINT "FK_dbb1c4b37d4629c3b9c59db8722" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
