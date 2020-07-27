import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Headers('user-agent') userAgent: string,
  ): Promise<TokensDto> {
    const { fingerprint } = authCredentialsDto;
    if (!fingerprint) {
      if (userAgent) {
        authCredentialsDto.fingerprint = userAgent;
      } else
        throw new BadRequestException('Please, provide device fingerprint.');
    }

    return this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Headers('user-agent') userAgent: string,
  ): Promise<TokensDto> {
    const { fingerprint } = authCredentialsDto;
    if (!fingerprint) {
      if (userAgent) {
        authCredentialsDto.fingerprint = userAgent;
      } else
        throw new BadRequestException('Please, provide device fingerprint.');
    }

    return this.authService.signIn(authCredentialsDto);
  }

  @Post('refresh')
  async refresh(
    @Body(ValidationPipe) refreshCredentialsDto: RefreshCredentialsDto,
    @Headers('user-agent') userAgent: string,
  ): Promise<TokensDto> {
    const { fingerprint } = refreshCredentialsDto;
    if (!fingerprint) {
      if (userAgent) {
        refreshCredentialsDto.fingerprint = userAgent;
      } else
        throw new BadRequestException('Please, provide device fingerprint.');
    }

    return this.authService.refresh(refreshCredentialsDto);
  }
}
