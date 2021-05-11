import {MigrationInterface, QueryRunner} from "typeorm";

export class fixforechenotfunction1620576056752 implements MigrationInterface {
    name = 'fixforechenotfunction1620576056752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5f4035564515762e47d19334f23"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "makerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_93812dfc45e39cd96c3a1c509b8" FOREIGN KEY ("makerId") REFERENCES "maker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_93812dfc45e39cd96c3a1c509b8"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "makerId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5f4035564515762e47d19334f23" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
