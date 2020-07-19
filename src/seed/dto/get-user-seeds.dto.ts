import { Seed } from '../seed.entity';

export class GetUserSeedsDto {
  currentSeed: Seed;
  nextSeed: Seed;
}
