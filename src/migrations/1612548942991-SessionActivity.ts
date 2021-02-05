import { MigrationInterface, QueryRunner } from 'typeorm';

export class SessionActivity1612548942991 implements MigrationInterface {
  name = 'SessionActivity1612548942991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ADD "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "active"`);
  }
}
