import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DiceModule } from './dice/dice.module';
import ormconfig from './ormconfig';
import { PlayModule } from './play/play.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DiceModule,
    PlayModule,
    SeedModule,
  ],
})
export class AppModule {}
