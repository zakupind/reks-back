import { IsString } from 'class-validator';

import { AuthCredentialsDto } from './auth-credentials.dto';

export class SignInCredentialsDto extends AuthCredentialsDto {
  @IsString()
  fingerprint: string;
}
