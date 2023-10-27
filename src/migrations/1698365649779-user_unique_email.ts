import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUniqueEmail1698365649779 implements MigrationInterface {
    name = 'UserUniqueEmail1698365649779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945"`);
    }

}
