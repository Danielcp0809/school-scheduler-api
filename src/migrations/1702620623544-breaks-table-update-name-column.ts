import { MigrationInterface, QueryRunner } from "typeorm";

export class BreaksTableUpdateNameColumn1702620623544 implements MigrationInterface {
    name = 'BreaksTableUpdateNameColumn1702620623544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Breaks" DROP CONSTRAINT "UQ_35bce7488932a0711d6b46d8a64"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Breaks" ADD CONSTRAINT "UQ_35bce7488932a0711d6b46d8a64" UNIQUE ("name")`);
    }

}
