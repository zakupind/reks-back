import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { GetUserSeedsDto } from './dto/get-user-seeds.dto';
import { Seed } from './seed.entity';

@EntityRepository(Seed)
export class SeedRepository extends Repository<Seed> {
  async getUserSeeds(user: User): Promise<GetUserSeedsDto> {
    const seeds = await this.find({
      where: {
        user,
        revealed: false,
      },
    });

    const currentSeed = seeds.find(seed => seed.active);
    const nextSeed = seeds.find(seed => !seed.active);

    const getUserSeedsDto: GetUserSeedsDto = {
      currentSeed,
      nextSeed,
    };

    return getUserSeedsDto;
  }
}
