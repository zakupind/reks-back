import { MigrationInterface, QueryRunner } from 'typeorm';

export class InlineCursorOff1595850374669 implements MigrationInterface {
  name = 'InlineCursorOff1595850374669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "play" DROP COLUMN "inlineCursor"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "play" ADD "inlineCursor" integer NOT NULL DEFAULT 0`,
    );
  }
}
