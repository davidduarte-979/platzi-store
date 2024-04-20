import {MigrationInterface, QueryRunner} from "typeorm";

export class productBrand1713630915348 implements MigrationInterface {
    name = 'productBrand1713630915348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updateAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
    }

}
