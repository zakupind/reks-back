import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActiveSeed1595167263498 implements MigrationInterface {
  name = 'ActiveSeed1595167263498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" ADD "active" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "seed" DROP COLUMN "active"`);
  }
}
