import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCredentialsTable1697881408254 implements MigrationInterface {
    name = 'UpdateCredentialsTable1697881408254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" ADD "is_admin" bit NOT NULL CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3" DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_6c5f8fb8e5149dabe5cb0566fd3"`);
        await queryRunner.query(`ALTER TABLE "Credentials" DROP COLUMN "is_admin"`);
    }

}
