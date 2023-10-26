import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsEnabledFix1698284729976 implements MigrationInterface {
    name = 'UserIsEnabledFix1698284729976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd" DEFAULT 1 FOR "is_enabled"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "DF_959057cfa43d46bdbd64c5d07cd" DEFAULT 0 FOR "is_enabled"`);
    }

}
