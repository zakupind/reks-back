import {MigrationInterface, QueryRunner} from "typeorm";

export class start1620156853745 implements MigrationInterface {
    name = 'start1620156853745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "betAmount" integer NOT NULL, "multiplier" numeric, "cursor" integer NOT NULL DEFAULT '0', "nonce" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "seedId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
