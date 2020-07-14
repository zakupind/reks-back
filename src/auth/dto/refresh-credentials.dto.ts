import { IsString, Matches } from 'class-validator';

export class RefreshCredentialsDto {
  @IsString()
  fingerprint: string;

  @Matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, {
    message: 'refreshToken must be a valid JWT token',
  })
  refreshToken: string;
}
