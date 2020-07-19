import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { GetHashesDto } from './dto/get-hashes.dto';
import { Seed } from './seed.entity';
import { SeedRepository } from './seed.repository';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(
    private seedService: SeedService,
    private seedRepository: SeedRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHashes(@GetUser() user: User): Promise<GetHashesDto> {
    return this.seedService.getHashes(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reveal')
  async revealHash(
    @GetUser() user: User,
    @Body('clientSeed') clientSeed: string,
  ): Promise<void> {
    return this.seedService.revealSeed(user, clientSeed);
  }

  // PAGINATION
  @UseGuards(JwtAuthGuard)
  @Get('findandCount')
  async findAndCount(@GetUser() user: User): Promise<Seed[]> {
    const take = 5;
    const skip = take * 1;
    return this.seedRepository.find({
      where: {
        user,
      },
      order: {
        id: -1,
      },
      take,
      skip,
    });
  }
}
