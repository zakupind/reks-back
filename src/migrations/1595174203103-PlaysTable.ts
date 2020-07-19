import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaysTable1595174203103 implements MigrationInterface {
  name = 'PlaysTable1595174203103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "play" ("id" SERIAL NOT NULL, "game" character varying NOT NULL, "betAmount" integer NOT NULL, "multiplier" numeric, "cursor" integer NOT NULL DEFAULT 0, "inlineCursor" integer NOT NULL DEFAULT 0, "nonce" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "seedId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78bc0ac5050cc1068217341a73e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "play" ADD CONSTRAINT "FK_6663695b4c2f927cd31ce0ff543" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "play" ADD CONSTRAINT "FK_c2fc7257270b0ad9059ba6aeb14" FOREIGN KEY ("seedId") REFERENCES "seed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "play" DROP CONSTRAINT "FK_c2fc7257270b0ad9059ba6aeb14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "play" DROP CONSTRAINT "FK_6663695b4c2f927cd31ce0ff543"`,
    );
    await queryRunner.query(`DROP TABLE "play"`);
  }
}
