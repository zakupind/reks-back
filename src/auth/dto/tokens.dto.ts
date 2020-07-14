import { Matches } from 'class-validator';

export class TokensDto {
  @Matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, {
    message: 'refreshToken must be a valid JWT token',
  })
  accessToken: string;

  @Matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, {
    message: 'refreshToken must be a valid JWT token',
  })
  refreshToken: string;
}
