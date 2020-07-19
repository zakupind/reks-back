import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultNonce01595168046861 implements MigrationInterface {
  name = 'DefaultNonce01595168046861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" ALTER COLUMN "nonce" SET DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" ALTER COLUMN "nonce" SET DEFAULT 1`,
    );
  }
}
