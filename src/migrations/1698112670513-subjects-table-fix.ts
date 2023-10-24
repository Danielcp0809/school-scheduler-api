import { MigrationInterface, QueryRunner } from "typeorm";

export class SubjectsTableFix1698112670513 implements MigrationInterface {
    name = 'SubjectsTableFix1698112670513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TeacherSubject" DROP CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401"`);
        await queryRunner.query(`CREATE TABLE "Subjects" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_bb8534e54fe0c8357b2e87a60b8" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ef83ddc0d153932d3242a6aa726" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_4506c33ae63133dd7813484bc89" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "description" varchar(max) NOT NULL, "color" varchar(10) NOT NULL, "is_enabled" bit NOT NULL CONSTRAINT "DF_39c132f1a37a94eb6bfe44c94dd" DEFAULT 1, CONSTRAINT "UQ_f18d27b07adc003b95b80861e88" UNIQUE ("name"), CONSTRAINT "UQ_99f68a38ec4d035b23b376f8a26" UNIQUE ("color"), CONSTRAINT "PK_4506c33ae63133dd7813484bc89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP CONSTRAINT "UQ_91e604e095bdcc1f570a43fd858"`);
        await queryRunner.query(`ALTER TABLE "Schools" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "TeacherSubject" ADD CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TeacherSubject" DROP CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401"`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "color" varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD CONSTRAINT "UQ_91e604e095bdcc1f570a43fd858" UNIQUE ("color")`);
        await queryRunner.query(`ALTER TABLE "Schools" ADD "description" varchar(MAX) NOT NULL`);
        await queryRunner.query(`DROP TABLE "Subjects"`);
        await queryRunner.query(`ALTER TABLE "TeacherSubject" ADD CONSTRAINT "FK_3c0d8b8333ddb02900dddffd401" FOREIGN KEY ("subject_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
