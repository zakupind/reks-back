import { EntityRepository, Repository } from 'typeorm';

import { Play } from './play.entity';

@EntityRepository(Play)
export class PlayRepository extends Repository<Play> {}
