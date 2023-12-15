import { MigrationInterface, QueryRunner } from "typeorm";

export class SettingsBreaksTables1702615309177 implements MigrationInterface {
    name = 'SettingsBreaksTables1702615309177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Settings" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_8949c0b494dd80c82b5e41dd7ab" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_cf73e3a1d2a1957c9b1e04fad5c" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_67f9851255786d09846e6323030" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "hour_size" int NOT NULL, "start_day_time" int NOT NULL, "end_day_time" int NOT NULL, "week_days" varchar(50) NOT NULL, "school_id" uniqueidentifier, CONSTRAINT "UQ_d62f24789c550bc46a3fafee114" UNIQUE ("name"), CONSTRAINT "PK_67f9851255786d09846e6323030" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Breaks" ("created_at" datetime2 NOT NULL CONSTRAINT "DF_e7223f9bbe37e1bdc183a71f06d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_eae03e61a6e8395c91fe593e439" DEFAULT getdate(), "id" uniqueidentifier NOT NULL CONSTRAINT "DF_19db558fe17b65db8e15f154f7e" DEFAULT NEWSEQUENTIALID(), "name" varchar(100) NOT NULL, "start_time" int NOT NULL, "end_time" int NOT NULL, "week_days" varchar(50) NOT NULL, "every_day" int NOT NULL CONSTRAINT "DF_334555f7d4402275ea182b4a3d3" DEFAULT 0, "settings_id" uniqueidentifier, CONSTRAINT "UQ_35bce7488932a0711d6b46d8a64" UNIQUE ("name"), CONSTRAINT "PK_19db558fe17b65db8e15f154f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Settings" ADD CONSTRAINT "FK_0b780dccd87d74cd287a2e5d5f4" FOREIGN KEY ("school_id") REFERENCES "Schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Breaks" ADD CONSTRAINT "FK_f77921d47f961971c4a168bc515" FOREIGN KEY ("settings_id") REFERENCES "Settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Breaks" DROP CONSTRAINT "FK_f77921d47f961971c4a168bc515"`);
        await queryRunner.query(`ALTER TABLE "Settings" DROP CONSTRAINT "FK_0b780dccd87d74cd287a2e5d5f4"`);
        await queryRunner.query(`DROP TABLE "Breaks"`);
        await queryRunner.query(`DROP TABLE "Settings"`);
    }

}
