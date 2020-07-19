import { User } from '../../auth/user.entity';
import { Seed } from '../../seed/seed.entity';

export class SaveDiceDto {
  user: User;
  multiplier: number;
  betAmount: number;
}
