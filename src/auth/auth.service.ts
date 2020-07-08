import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtPayload } from './jwt-payload.interface';
import { SessionRepository } from './session.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<TokensDto> {
    const { username, fingerprint } = authCredentialsDto;

    const user = await this.userRepository.signUp(authCredentialsDto);

    const payload: JwtPayload = {
      username,
    };
    const tokensDto = this.createTokens(payload);

    return await this.sessionRepository.addSession(
      user,
      tokensDto,
      fingerprint,
    );
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<TokensDto> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    const { username, fingerprint } = authCredentialsDto;

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const tokensDto: TokensDto = this.createTokens(payload);

    return await this.sessionRepository.addSession(
      user,
      tokensDto,
      fingerprint,
    );
  }

  async refresh(
    refreshCredentialsDto: RefreshCredentialsDto,
  ): Promise<TokensDto> {
    const { refreshToken, fingerprint } = refreshCredentialsDto;

    let username: string;
    try {
      username = this.jwtService.verify<JwtPayload>(refreshToken).username;
    } catch (error) {
      throw new UnauthorizedException(
        'Please, sign in with login form. Refresh token has expired.',
      );
    }

    const session = await this.sessionRepository.findOne({
      where: {
        refreshToken,
      },
    });

    if (!session) {
      throw new UnauthorizedException('Please, sign in with login form.');
    }

    const fingerprintDoesntMatch = session.fingerprint !== fingerprint;

    if (fingerprintDoesntMatch) {
      session.remove();
      throw new UnauthorizedException(
        'Please, sign in with login form. Credentials dont match.',
      );
    }

    const payload: JwtPayload = { username };

    const tokensDto: TokensDto = this.createTokens(payload);

    session.accessToken = tokensDto.accessToken;
    session.refreshToken = tokensDto.refreshToken;

    await session.save();

    return tokensDto;
  }

  private createTokens(jwtPayload: JwtPayload): TokensDto {
    return {
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, { expiresIn: '60d' }),
    };
  }
}
