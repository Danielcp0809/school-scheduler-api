import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseTable1698114233782 implements MigrationInterface {
    name = 'CourseTable1698114233782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Courses" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_198b064b094080f5d97672938c5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6739ae395b173d6711c22ea9a34" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_e01ce00d3984a78d0693ab3ecbe" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "section" varchar(50) NOT NULL, "is_enabled" bit NOT NULL CONSTRAINT "DF_ab22673a1e1e24237c1e4386303" DEFAULT 1, "school_id" uniqueidentifier, CONSTRAINT "UQ_b267edca9bc40ba2ba2593db0a6" UNIQUE ("name"), CONSTRAINT "PK_e01ce00d3984a78d0693ab3ecbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Hours" ADD "course_id" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "Hours" ADD CONSTRAINT "FK_4dcad0de11bd8ae0f6cfd1d0be3" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Courses" ADD CONSTRAINT "FK_dd7c2bff1d59b16b479f064c5d8" FOREIGN KEY ("school_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT "FK_dd7c2bff1d59b16b479f064c5d8"`);
        await queryRunner.query(`ALTER TABLE "Hours" DROP CONSTRAINT "FK_4dcad0de11bd8ae0f6cfd1d0be3"`);
        await queryRunner.query(`ALTER TABLE "Hours" DROP COLUMN "course_id"`);
        await queryRunner.query(`DROP TABLE "Courses"`);
    }

}
