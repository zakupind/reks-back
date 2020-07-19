import { EntityRepository, Repository } from 'typeorm';

import { Seed } from './seed.entity';

@EntityRepository(Seed)
export class SeedRepository extends Repository<Seed> {}
