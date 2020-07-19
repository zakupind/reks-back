import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { DiceService } from './dice.service';
import { DiceResultDto } from './dto/dice-result.dto';
import { PlayDiceDto } from './dto/play-dice.dto';

@Controller('dice')
export class DiceController {
  constructor(private diceService: DiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  playDice(
    @Body(new ValidationPipe({ transform: true })) playDiceDto: PlayDiceDto,
    @GetUser() user: User,
  ): Promise<DiceResultDto> {
    return this.diceService.playDice(playDiceDto, user);
  }
}
