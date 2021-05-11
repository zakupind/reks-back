import {MigrationInterface, QueryRunner} from "typeorm";

export class diagonalfloat1620577143991 implements MigrationInterface {
    name = 'diagonalfloat1620577143991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "diagonal"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "diagonal" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "diagonal"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "diagonal" integer`);
    }

}
