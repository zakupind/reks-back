import { IsString } from 'class-validator';

import { TokensDto } from './tokens.dto';

export class RefreshCredentialsDto extends TokensDto {
  @IsString()
  fingerprint: string;
}
