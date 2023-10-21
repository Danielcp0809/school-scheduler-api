import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697850585113 implements MigrationInterface {
    name = 'Init1697850585113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "is_enabled" bit NOT NULL CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7" DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teachers" DROP CONSTRAINT "DF_bb0df23df70c82f9ae99ea235a7"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "is_enabled"`);
    }

}
