import { User } from '../../auth/user.entity';
import { Seed } from '../../seed/seed.entity';
import { GameEnum } from '../types/game.enum';

export class AddGameDto {
  game: GameEnum;
  user: User;
  seed: Seed;
  multiplier: number;
  betAmount: number;
  cursor?: number;
  inlineCursor?: number;
  active?: boolean;
}
