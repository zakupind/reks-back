import { IsString, Matches } from 'class-validator';

export class RefreshCredentialsDto {
  @IsString()
  fingerprint: string;

  @Matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
  refreshToken: string;
}
