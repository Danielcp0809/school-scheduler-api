import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTeachersTableName1697881124384 implements MigrationInterface {
    name = 'UpdateTeachersTableName1697881124384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_999734c28f23eb920fdedb1d273"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_999734c28f23eb920fdedb1d273" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_999734c28f23eb920fdedb1d273"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_999734c28f23eb920fdedb1d273" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
