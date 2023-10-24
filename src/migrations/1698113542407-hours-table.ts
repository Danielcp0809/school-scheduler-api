import { MigrationInterface, QueryRunner } from "typeorm";

export class HoursTable1698113542407 implements MigrationInterface {
    name = 'HoursTable1698113542407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Hours" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_0865bafc5e6fc3af545c3303d82" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_a4b68ebeb06423830e4c89ba5f3" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_214f1909b7479a4f45cd6acbddf" DEFAULT NEWSEQUENTIALID(), "start_point" int NOT NULL, "end_point" int NOT NULL, "week_day" int NOT NULL, "subjectId" uniqueidentifier, CONSTRAINT "PK_214f1909b7479a4f45cd6acbddf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Hours" ADD CONSTRAINT "FK_dbb1c4b37d4629c3b9c59db8722" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Hours" DROP CONSTRAINT "FK_dbb1c4b37d4629c3b9c59db8722"`);
        await queryRunner.query(`DROP TABLE "Hours"`);
    }

}
