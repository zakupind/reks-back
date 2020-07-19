import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../auth/user.entity';
import { SeedService } from '../seed/seed.service';
import { DiceResultDto } from './dto/dice-result.dto';
import { PlayDiceDto } from './dto/play-dice.dto';

@Injectable()
export class DiceService {
  constructor(
    private seedService: SeedService,
    private configService: ConfigService,
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

    multiplier = +multiplier.toFixed(2);
    const amountAfterGame = amount * multiplier;

    const result: DiceResultDto = {
      amount: amountAfterGame,
      serverCursor,
      multiplier,
    };

    return result;
  }
}
