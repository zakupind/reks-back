import { Test } from '@nestjs/testing';

import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { Session } from './session.entity';
import { SessionRepository } from './session.repository';
import { User } from './user.entity';

const mockUser = new User();
const mockSession = new Session();
const mockTokensDto: TokensDto = {
  accessToken: 'testToken',
  refreshToken: 'testToken',
};
const mockFingerprint = 'mockFingerprint';
const mockRefreshDto: RefreshCredentialsDto = {
  refreshToken: 'testToken',
  fingerprint: mockFingerprint,
};

describe('UserRepository', () => {
  let sessionRepository: SessionRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SessionRepository],
    }).compile();

    sessionRepository = module.get<SessionRepository>(SessionRepository);
  });

  describe('addSession', () => {
    it('succesfully adds session', () => {
      const mockSessions = [
        mockSession,
        mockSession,
        mockSession,
        mockSession,
        mockSession,
      ];

      jest.spyOn(sessionRepository, 'find').mockResolvedValue(mockSessions);
      jest.spyOn(sessionRepository, 'remove').mockResolvedValue(mockSession);
      jest.spyOn(sessionRepository, 'create').mockReturnValue(mockSession);
      jest.spyOn(sessionRepository, 'save').mockResolvedValue(null);

      return expect(
        sessionRepository.addSession(mockUser, mockTokensDto, mockFingerprint),
      ).resolves.toEqual(mockTokensDto);
    });
  });

  describe('checkSession', () => {
    it('return null as session not found', () => {
      jest.spyOn(sessionRepository, 'findOne').mockResolvedValue(null);

      expect(
        sessionRepository.checkSession(mockRefreshDto),
      ).resolves.toBeNull();
    });

    it('return null as fingerprint does not match', () => {
      const mockSession = new Session();
      mockSession.fingerprint = 'anotherFingerprint';

      jest.spyOn(sessionRepository, 'findOne').mockResolvedValue(mockSession);
      jest.spyOn(sessionRepository, 'remove').mockResolvedValue(null);

      expect(
        sessionRepository.checkSession(mockRefreshDto),
      ).resolves.toBeNull();
    });

    it('successfully returns session', () => {
      const mockSession = new Session();
      mockSession.fingerprint = mockFingerprint;

      jest.spyOn(sessionRepository, 'findOne').mockResolvedValue(mockSession);

      expect(sessionRepository.checkSession(mockRefreshDto)).resolves.toEqual(
        mockSession,
      );
    });
  });
});
