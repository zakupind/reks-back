import {MigrationInterface, QueryRunner} from "typeorm";

export class addAllTables1620240898532 implements MigrationInterface {
    name = 'addAllTables1620240898532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "hex" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "maker" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_1bd37f2d6b1df3963946df4bc30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "betAmount"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "multiplier"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cursor"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "nonce"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "seedId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "memoryHdd" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "memorySsd" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "ram" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cpuName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cpuSpeed" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cpuCore" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "diagonal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "screenResolution" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "camera" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "FK_11620774493e842bd7167f74c10" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maker" ADD CONSTRAINT "FK_e8ee94a204d482df259136676c0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5f4035564515762e47d19334f23" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5f4035564515762e47d19334f23"`);
        await queryRunner.query(`ALTER TABLE "maker" DROP CONSTRAINT "FK_e8ee94a204d482df259136676c0"`);
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "FK_11620774493e842bd7167f74c10"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "camera"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "screenResolution"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "diagonal"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cpuCore"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cpuSpeed"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "cpuName"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "ram"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "memorySsd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "memoryHdd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "seedId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "product" ADD "nonce" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "cursor" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" ADD "multiplier" numeric`);
        await queryRunner.query(`ALTER TABLE "product" ADD "betAmount" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "maker"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
