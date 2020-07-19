import { EntityRepository, Repository } from 'typeorm';

import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { Session } from './session.entity';
import { User } from './user.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  async addSession(
    user: User,
    tokensDto: TokensDto,
    fingerprint: string,
  ): Promise<TokensDto> {
    const { sessions } = user;

    if (sessions.length >= 5) {
      await this.remove(sessions);
    }

    const newSession = this.create();

    newSession.user = user;
    newSession.accessToken = tokensDto.accessToken;
    newSession.refreshToken = tokensDto.refreshToken;
    newSession.fingerprint = fingerprint;
    await this.save(newSession);

    return tokensDto;
  }

  async checkSession(
    refreshCredentialsDto: RefreshCredentialsDto,
  ): Promise<Session> {
    const { refreshToken, fingerprint } = refreshCredentialsDto;

    const session = await this.findOne({
      where: {
        refreshToken,
      },
    });

    if (session && session.fingerprint !== fingerprint) {
      this.remove(session);
      return null;
    }

    return session;
  }
}
