import {MigrationInterface, QueryRunner} from "typeorm";

export class delColor1620490885172 implements MigrationInterface {
    name = 'delColor1620490885172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maker" RENAME COLUMN "name" TO "nameMaker"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "name" TO "nameCategory"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."price" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "memoryHdd" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."memoryHdd" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "memorySsd" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."memorySsd" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "ram" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."ram" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuName" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuSpeed" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuSpeed" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuCore" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuCore" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diagonal" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."diagonal" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "screenResolution" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."screenResolution" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "camera" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."camera" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."camera" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "camera" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."screenResolution" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "screenResolution" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."diagonal" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "diagonal" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuCore" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuCore" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuSpeed" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuSpeed" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."cpuName" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "cpuName" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."ram" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "ram" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."memorySsd" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "memorySsd" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."memoryHdd" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "memoryHdd" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."price" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "nameCategory" TO "name"`);
        await queryRunner.query(`ALTER TABLE "maker" RENAME COLUMN "nameMaker" TO "name"`);
    }

}
