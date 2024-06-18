import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1718678722577 implements MigrationInterface {
    name = 'Migration1718678722577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "eMail" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "eMail"`);
    }

}
