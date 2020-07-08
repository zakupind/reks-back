import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fingerprint1594229164808 implements MigrationInterface {
  name = 'Fingerprint1594229164808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ADD "fingerprint" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "fingerprint"`);
  }
}
