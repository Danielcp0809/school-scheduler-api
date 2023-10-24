import { MigrationInterface, QueryRunner } from "typeorm";

export class SchoolsEntity1698110706676 implements MigrationInterface {
    name = 'SchoolsEntity1698110706676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Schools" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_a908ca1606ba0c65c1d8360c615" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_9c29d92807f75b84b4908b001f7" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_57e79f91cef5421dba603ac464c" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "address" varchar(max), "phone" varchar(50), "is_new" bit NOT NULL CONSTRAINT "DF_741b4e63bfec5fcda31323fde23" DEFAULT 1, "onboarding_step" int NOT NULL CONSTRAINT "DF_2c48602ddf5bd59dbe647a825fc" DEFAULT 1, "is_enabled" bit NOT NULL CONSTRAINT "DF_2f907fa034fd76fb5c681fc1a65" DEFAULT 1, CONSTRAINT "UQ_764230d070a536216c00ab477ea" UNIQUE ("name"), CONSTRAINT "PK_57e79f91cef5421dba603ac464c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "school_id" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "school_id" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_bd6ad34640c615013acd7410066"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_bd6ad34640c615013acd7410066" DEFAULT 1 FOR "reset_password"`);
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3" DEFAULT 0 FOR "is_admin"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd" DEFAULT 0 FOR "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7"`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7" DEFAULT 0 FOR "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_5f8a4cd4a2f9e8a4046deeb23ae" FOREIGN KEY ("school_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD CONSTRAINT "FK_34c4a283d7923a789bb69effb21" FOREIGN KEY ("school_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "FK_34c4a283d7923a789bb69effb21"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_5f8a4cd4a2f9e8a4046deeb23ae"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7"`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7" DEFAULT '1' FOR "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd" DEFAULT '1' FOR "is_enabled"`);
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3" DEFAULT '0' FOR "is_admin"`);
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_bd6ad34640c615013acd7410066"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_bd6ad34640c615013acd7410066" DEFAULT '1' FOR "reset_password"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "school_id"`);
        await queryRunner.query(`DROP TABLE "Schools"`);
    }

}
