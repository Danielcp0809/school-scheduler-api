import { MigrationInterface, QueryRunner } from "typeorm";

export class SettingsTableUpdateNameColum1702620509036 implements MigrationInterface {
    name = 'SettingsTableUpdateNameColum1702620509036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Settings" DROP CONSTRAINT "UQ_d62f24789c550bc46a3fafee114"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Settings" ADD CONSTRAINT "UQ_d62f24789c550bc46a3fafee114" UNIQUE ("name")`);
    }

}
