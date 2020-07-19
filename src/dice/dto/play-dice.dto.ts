import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, Max, Min } from 'class-validator';

export class PlayDiceDto {
  @IsNumber()
  @Min(2)
  @Max(98)
  @Transform(parseFloat)
  cursor: number;

  @IsBoolean()
  @Transform(JSON.parse)
  above: boolean;

  @IsNumber()
  @Min(1)
  @Transform(parseFloat)
  amount: number;
}
