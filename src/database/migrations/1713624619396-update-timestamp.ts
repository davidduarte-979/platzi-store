import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTimestamp1713624619396 implements MigrationInterface {
    name = 'updateTimestamp1713624619396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
