import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { TokensDto } from './tokens.dto';

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
}
