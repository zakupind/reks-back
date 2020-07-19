import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.entity';
import { DiceService } from './dice.service';
import { PlayDiceResultDto } from './dto/play-dice-result.dto';
import { PlayDiceDto } from './dto/play-dice.dto';

@Controller('dice')
export class DiceController {
  constructor(private diceService: DiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  playDice(
    @Body(new ValidationPipe({ transform: true })) playDiceDto: PlayDiceDto,
    @GetUser() user: User,
  ): Promise<PlayDiceResultDto> {
    return this.diceService.playDice(playDiceDto, user);
  }
}
