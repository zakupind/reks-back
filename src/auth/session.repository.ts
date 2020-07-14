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
    const sessions = await this.find({
      where: {
        userId: user.id,
      },
    });

    if (sessions.length >= 5) {
      await this.remove(sessions);
    }

    const session = this.create();

    session.user = user;
    session.accessToken = tokensDto.accessToken;
    session.refreshToken = tokensDto.refreshToken;
    session.fingerprint = fingerprint;
    await this.save(session);

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
