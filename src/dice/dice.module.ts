import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayRepository } from '../play/play.repository';
import { PlayService } from '../play/play.service';
import { SeedRepository } from '../seed/seed.repository';
import { SeedService } from '../seed/seed.service';
import { DiceController } from './dice.controller';
import { DiceService } from './dice.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeedRepository, PlayRepository])],
  providers: [DiceService, SeedService, PlayService],
  controllers: [DiceController],
})
export class DiceModule {}
