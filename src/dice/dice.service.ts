import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../auth/user.entity';
import { AddGameDto } from '../play/dto/add-game.dto';
import { PlayService } from '../play/play.service';
import { GameEnum } from '../play/types/game.enum';
import { SeedRepository } from '../seed/seed.repository';
import { SeedService } from '../seed/seed.service';
import { DiceResultDto } from './dto/dice-result.dto';
import { PlayDiceDto } from './dto/play-dice.dto';
import { SaveDiceDto } from './dto/save-dice.dto';

@Injectable()
export class DiceService {
  constructor(
    private seedService: SeedService,
    private configService: ConfigService,
    private seedRepository: SeedRepository,
    private playService: PlayService,
  ) {}

  async playDice(playDiceDto: PlayDiceDto, user: User): Promise<DiceResultDto> {
    const { cursor, above, amount } = playDiceDto;
    const houseEdge = +this.configService.get<string>('DICE_HOUSE_EDGE');

    const hex = await this.seedService.createUserHash(user);
    const float = this.seedService.generateFloat(hex);

    const serverCursor = +(float * 100).toFixed(2);

    let multiplier: number;

    if (above) {
      if (serverCursor > cursor) {
        multiplier = (100 - houseEdge) / (100 - cursor);
      }
    } else {
      if (serverCursor < cursor) {
        multiplier = (100 - houseEdge) / cursor;
      }
    }

    if (!multiplier) {
      multiplier = 0;
    }

    multiplier = +multiplier.toFixed(4);
    const amountAfterGame = amount * multiplier;

    const result: DiceResultDto = {
      amount: amountAfterGame,
      serverCursor,
      multiplier,
    };

    const saveDiceDto: SaveDiceDto = {
      user,
      multiplier,
      betAmount: amount,
    };

    await this.saveGame(saveDiceDto);

    return result;
  }

  async saveGame(saveDiceDto: SaveDiceDto): Promise<void> {
    const { user, multiplier, betAmount } = saveDiceDto;

    const seed = await this.seedRepository.findOne({
      where: {
        active: true,
        user,
      },
    });

    const addGameDto: AddGameDto = {
      game: GameEnum.dice,
      user,
      multiplier,
      betAmount,
      seed,
    };

    await this.playService.addGame(addGameDto);
  }
}
