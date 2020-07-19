import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientSeedNullable1595163630991 implements MigrationInterface {
  name = 'ClientSeedNullable1595163630991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" ALTER COLUMN "clientSeed" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seed" ALTER COLUMN "clientSeed" DROP NOT NULL`,
    );
  }
}
