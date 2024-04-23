import {MigrationInterface, QueryRunner} from "typeorm";

export class ordersColumnRemoveDate1713876308705 implements MigrationInterface {
    name = 'ordersColumnRemoveDate1713876308705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "date"`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order_item"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order_item"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order_item"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order_item"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "date" date NOT NULL`);
    }

}
