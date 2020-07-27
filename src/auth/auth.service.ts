import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SeedService } from '../seed/seed.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { SessionRepository } from './session.repository';
import { JwtPayload } from './type/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
    private readonly seedService: SeedService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<TokensDto> {
    const { username, fingerprint } = authCredentialsDto;

    const user = await this.userRepository.signUp(authCredentialsDto);

    const payload: JwtPayload = {
      username,
    };
    const tokensDto = this.createTokens(payload);

    await this.seedService.createSeeds(user, 2);

    return await this.sessionRepository.addSession(
      user,
      tokensDto,
      fingerprint,
    );
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<TokensDto> {
    const { username, fingerprint } = authCredentialsDto;

    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) throw new UnauthorizedException('Invalid credentials');

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
    const { refreshToken } = refreshCredentialsDto;

    let username: string;
    try {
      username = this.jwtService.verify<JwtPayload>(refreshToken).username;
    } catch (error) {
      throw new UnauthorizedException('Please, sign in with login form.');
    }

    const session = await this.sessionRepository.checkSession(
      refreshCredentialsDto,
    );

    if (!session) {
      throw new UnauthorizedException('Please, sign in with login form.');
    }

    const payload: JwtPayload = { username };
    const tokensDto: TokensDto = this.createTokens(payload);
    await this.sessionRepository.update(session.id, tokensDto);

    return tokensDto;
  }

  private createTokens(jwtPayload: JwtPayload): TokensDto {
    return {
      accessToken: this.jwtService.sign(jwtPayload),
      refreshToken: this.jwtService.sign(jwtPayload, { expiresIn: '60d' }),
    };
  }
}
