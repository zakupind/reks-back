import { MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1595155037065 implements MigrationInterface {
  name = 'seeds1595155037065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seed" ("id" SERIAL NOT NULL, "serverSeed" character varying NOT NULL, "serverSeedHashed" character varying NOT NULL, "clientSeed" character varying, "nonce" integer NOT NULL DEFAULT 1, "revealed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_e959d094217adb4d796a027d2c8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seed"`);
  }
}
