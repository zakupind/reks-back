import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
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

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<TokensDto> {
    const user = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );

    const { username, fingerprint } = signInCredentialsDto;

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const tokensDto: TokensDto = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '60d' }),
    };

    await this.sessionRepository.addSession(user, tokensDto, fingerprint);

    return tokensDto;
  }

  async refresh(
    refreshCredentialsDto: RefreshCredentialsDto,
  ): Promise<TokensDto> {
    const { accessToken, refreshToken, fingerprint } = refreshCredentialsDto;

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

    const accessTokenDoesntMatch = session.accessToken !== accessToken;
    const fingerprintDoesntMatch = session.fingerprint !== fingerprint;

    if (accessTokenDoesntMatch || fingerprintDoesntMatch) {
      session.remove();
      throw new UnauthorizedException(
        'Please, sign in with login form. Credentials dont match.',
      );
    }

    const payload: JwtPayload = { username };

    const newTokensDto: TokensDto = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '60d' }),
    };

    session.accessToken = newTokensDto.accessToken;
    session.refreshToken = newTokensDto.refreshToken;

    await session.save();

    return newTokensDto;
  }
}
