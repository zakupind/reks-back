import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<TokensDto> {
    return this.authService.signIn(signInCredentialsDto);
  }

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('refresh')
  async refresh(
    @Body(ValidationPipe) refreshCredentialsDto: RefreshCredentialsDto,
  ): Promise<TokensDto> {
    return this.authService.refresh(refreshCredentialsDto);
  }
}
