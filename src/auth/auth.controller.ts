import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokensDto } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokensDto> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('refresh')
  async refresh(
    @Body(ValidationPipe) tokensDto: TokensDto,
  ): Promise<TokensDto> {
    return this.authService.refresh(tokensDto);
  }
}
