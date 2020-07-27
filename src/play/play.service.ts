import { Injectable } from '@nestjs/common';

import { AddGameDto } from './dto/add-game.dto';
import { Play } from './play.entity';
import { PlayRepository } from './play.repository';

@Injectable()
export class PlayService {
  constructor(private playRepository: PlayRepository) {}

  async addGame(addGameDto: AddGameDto): Promise<Play> {
    return this.playRepository.addGame(addGameDto);
  }
}
