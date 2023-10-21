import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndCredentialsTables1697881028689 implements MigrationInterface {
    name = 'UserAndCredentialsTables1697881028689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "FK_7f2d8cf9cde23e28d541686faaa"`);
        await queryRunner.query(`DROP INDEX "REL_7f2d8cf9cde23e28d541686faa" ON "Credentials"`);
        await queryRunner.query(`EXEC sp_rename "school-scheduler-db.dbo.Credentials.teacher_id", "user_id"`);
        await queryRunner.query(`CREATE TABLE "Teacher" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_7f1e57f064a1a76275202833fb8" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_50699ac6eb0b0b258565ed6c210" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_c089345af0160b3fd7b44f59e61" DEFAULT NEWSEQUENTIALID(), "first_name" varchar(50) NOT NULL, "last_name" varchar(50) NOT NULL, "is_enabled" bit NOT NULL CONSTRAINT "DF_c7136dd84895db52a988fed61c5" DEFAULT '1', CONSTRAINT "PK_c089345af0160b3fd7b44f59e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_932652535a6e452f74d450dfb76" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_5abe0e95e97c3e6b9858dbc7817" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_16d4f7d636df336db11d87413e3" DEFAULT NEWSEQUENTIALID(), "first_name" varchar(100) NOT NULL, "last_name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "is_enabled" bit NOT NULL CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd" DEFAULT '1', "teacher_id" uniqueidentifier, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_999734c28f23eb920fdedb1d27" ON "Users" ("teacher_id") WHERE "teacher_id" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_54ad8c80e7f5af3ada83d2283f" ON "Credentials" ("user_id") WHERE "user_id" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_999734c28f23eb920fdedb1d273" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "FK_54ad8c80e7f5af3ada83d2283f0" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "FK_54ad8c80e7f5af3ada83d2283f0"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_999734c28f23eb920fdedb1d273"`);
        await queryRunner.query(`DROP INDEX "REL_54ad8c80e7f5af3ada83d2283f" ON "Credentials"`);
        await queryRunner.query(`DROP INDEX "REL_999734c28f23eb920fdedb1d27" ON "Users"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Teacher"`);
        await queryRunner.query(`EXEC sp_rename "school-scheduler-db.dbo.Credentials.user_id", "teacher_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7f2d8cf9cde23e28d541686faa" ON "Credentials" ("teacher_id") WHERE ([teacher_id] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "FK_7f2d8cf9cde23e28d541686faaa" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
