import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedController } from './seed.controller';
import { SeedRepository } from './seed.repository';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeedRepository])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
