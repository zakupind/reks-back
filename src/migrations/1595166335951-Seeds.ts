import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeds1595166335951 implements MigrationInterface {
  name = 'Seeds1595166335951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seed" ("id" SERIAL NOT NULL, "serverSeed" character varying NOT NULL, "serverSeedHashed" character varying NOT NULL, "clientSeed" character varying NOT NULL, "nonce" integer NOT NULL DEFAULT 1, "revealed" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e959d094217adb4d796a027d2c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "seed" ADD CONSTRAINT "FK_8554f6e61623ffed70268b64fe1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" DROP CONSTRAINT "FK_8554f6e61623ffed70268b64fe1"`,
    );
    await queryRunner.query(`DROP TABLE "seed"`);
  }
}
