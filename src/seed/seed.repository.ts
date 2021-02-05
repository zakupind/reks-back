import { EntityRepository, Repository } from 'typeorm';

import { User } from '../auth/user.entity';
import { GetUserSeedsDto } from './dto/get-user-seeds.dto';
import { Seed } from './seed.entity';

@EntityRepository(Seed)
export class SeedRepository extends Repository<Seed> {
  async getUserSeeds(user: User): Promise<GetUserSeedsDto> {
    const [nextSeed, currentSeed] = await this.find({
      where: {
        user,
        revealed: false,
      },
      order: {
        id: 'DESC',
      },
      take: 2,
    });

    return {
      currentSeed,
      nextSeed,
    };
  }
}
