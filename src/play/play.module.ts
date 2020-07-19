import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayRepository } from './play.repository';
import { PlayService } from './play.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayRepository])],
  providers: [PlayService],
})
export class PlayModule {}
