import { MigrationInterface, QueryRunner } from "typeorm";

export class UserResetPassword1698364560214 implements MigrationInterface {
    name = 'UserResetPassword1698364560214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_bd6ad34640c615013acd7410066"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_bd6ad34640c615013acd7410066" DEFAULT 0 FOR "reset_password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Credentials" DROP CONSTRAINT "DF_bd6ad34640c615013acd7410066"`);
        await queryRunner.query(`ALTER TABLE "Credentials" ADD CONSTRAINT "DF_bd6ad34640c615013acd7410066" DEFAULT 1 FOR "reset_password"`);
    }

}
