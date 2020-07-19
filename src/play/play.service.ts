import { Injectable } from '@nestjs/common';

import { AddGameDto } from './dto/add-game.dto';
import { PlayRepository } from './play.repository';

@Injectable()
export class PlayService {
  constructor(private playRepository: PlayRepository) {}

  async addGame(addGameDto: AddGameDto): Promise<void> {
    const {
      user,
      betAmount,
      multiplier,
      seed,
      game,
      inlineCursor,
      cursor,
      active,
    } = addGameDto;

    console.log(multiplier);

    const play = this.playRepository.create();

    play.game = game;
    play.betAmount = betAmount;
    play.multiplier = multiplier;
    play.user = user;
    play.seed = seed;
    play.nonce = seed.nonce;
    play.cursor = cursor;
    play.active = active;
    play.inlineCursor = inlineCursor;

    await this.playRepository.save(play);
  }
}
