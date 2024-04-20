import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCustomerTable1713627702966 implements MigrationInterface {
    name = 'fixCustomerTable1713627702966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "lastName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
    }

}
