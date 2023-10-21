import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditColumns1697869403121 implements MigrationInterface {
    name = 'AddAuditColumns1697869403121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "created_at" datetime2 NOT NULL CONSTRAINT "DF_6202d7d4be3028d14e50d6dc9dd" DEFAULT getdate()`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "updated_at" datetime2 NOT NULL CONSTRAINT "DF_1acbb370cc31b180162d0d29122" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "DF_1acbb370cc31b180162d0d29122"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "DF_6202d7d4be3028d14e50d6dc9dd"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "created_at"`);
    }

}
