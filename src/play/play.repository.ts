import { EntityRepository, Repository } from 'typeorm';

import { AddGameDto } from './dto/add-game.dto';
import { Play } from './play.entity';

@EntityRepository(Play)
export class PlayRepository extends Repository<Play> {
  async addGame(addGameDto: AddGameDto): Promise<Play> {
    const {
      seed: { nonce },
    } = addGameDto;

    return await this.create({ ...addGameDto, nonce }).save();
  }
}
