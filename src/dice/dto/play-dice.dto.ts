import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, Max, Min } from 'class-validator';

export class PlayDiceDto {
  @IsNumber()
  @Min(2)
  @Max(98)
  @Transform(({ value }) => parseFloat(value))
  position: number;

  @IsBoolean()
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  })
  above: boolean;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  amount: number;
}
