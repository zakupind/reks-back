import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedRepository } from '../seed/seed.repository';
import { SeedService } from '../seed/seed.service';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeedRepository])],
  providers: [DiceService, SeedService],
  controllers: [DiceController],
})
export class DiceModule {}
