import { MigrationInterface, QueryRunner } from "typeorm";

export class SubjectTable1698112521977 implements MigrationInterface {
    name = 'SubjectTable1698112521977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TeacherSubject" ("teacher_id" uniqueidentifier NOT NULL, "subject_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_78c9fb2035adacce29a45dd9ce8" PRIMARY KEY ("teacher_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3f221db6acb539219415a055f" ON "TeacherSubject" ("teacher_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c0d8b8333ddb02900dddffd40" ON "TeacherSubject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "DF_741b4e63bfec5fcda31323fde23"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "is_new"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "DF_2c48602ddf5bd59dbe647a825fc"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "onboarding_step"`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "description" varchar(max) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "color" varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD CONSTRAINT "UQ_91e604e095bdcc1f570a43fd858" UNIQUE ("color")`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "address" varchar(max)`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "phone" varchar(50)`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "is_new" bit NOT NULL CONSTRAINT "DF_741b4e63bfec5fcda31323fde23" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "onboarding_step" int NOT NULL CONSTRAINT "DF_2c48602ddf5bd59dbe647a825fc" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "TeacherSubject" ADD CONSTRAINT "FK_a3f221db6acb539219415a055ff" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "TeacherSubject" ADD CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401" FOREIGN KEY ("subject_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TeacherSubject" DROP CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401"`);
        await queryRunner.query(`ALTER TABLE "TeacherSubject" DROP CONSTRAINT "FK_a3f221db6acb539219415a055ff"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "DF_2c48602ddf5bd59dbe647a825fc"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "onboarding_step"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "DF_741b4e63bfec5fcda31323fde23"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "is_new"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "UQ_91e604e095bdcc1f570a43fd858"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "onboarding_step" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD CONSTRAINT "DF_2c48602ddf5bd59dbe647a825fc" DEFAULT 1 FOR "onboarding_step"`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "is_new" bit NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD CONSTRAINT "DF_741b4e63bfec5fcda31323fde23" DEFAULT 1 FOR "is_new"`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "phone" varchar(50)`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "address" varchar(MAX)`);
        await queryRunner.query(`DROP INDEX "IDX_3c0d8b8333ddb02900dddffd40" ON "TeacherSubject"`);
        await queryRunner.query(`DROP INDEX "IDX_a3f221db6acb539219415a055f" ON "TeacherSubject"`);
        await queryRunner.query(`DROP TABLE "TeacherSubject"`);
    }

}
