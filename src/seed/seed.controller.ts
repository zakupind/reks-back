import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { GetHashesDto } from './dto/get-hashes.dto';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

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
}
