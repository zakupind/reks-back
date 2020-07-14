import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RefreshCredentialsDto } from './dto/refresh-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtStrategy } from './jwt.strategy';
import { Session } from './session.entity';
import { SessionRepository } from './session.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

const authCredentialsDto: AuthCredentialsDto = {
  username: 'testUser',
  password: 'testPassword',
  fingerprint: 'fingerprint',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let sessionRepository: SessionRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: '60s',
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        UserRepository,
        SessionRepository,
        JwtStrategy,
        ConfigService,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    sessionRepository = module.get<SessionRepository>(SessionRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw unauthorized exception as password is invalid', () => {
      const validate = jest
        .spyOn(userRepository, 'validateUserPassword')
        .mockRejectedValue(new UnauthorizedException());

      expect(validate).not.toHaveBeenCalled();

      return expect(authService.signIn(authCredentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should successfully login', () => {
      const expectedResult: TokensDto = {
        accessToken: 'testToken',
        refreshToken: 'testToken',
      };

      jest
        .spyOn(userRepository, 'validateUserPassword')
        .mockResolvedValue(new User());
      jest
        .spyOn(sessionRepository, 'addSession')
        .mockResolvedValue(expectedResult);

      expect(userRepository.validateUserPassword).not.toHaveBeenCalled();

      expect(authService.signIn(authCredentialsDto)).resolves.toEqual(
        expectedResult,
      );
    });
  });

  describe('signUp', () => {
    it('should successfully register', () => {
      const expectedResult: TokensDto = {
        accessToken: 'testToken',
        refreshToken: 'testToken',
      };
      jest.spyOn(userRepository, 'signUp').mockResolvedValue(undefined);

      jest
        .spyOn(sessionRepository, 'addSession')
        .mockResolvedValue(expectedResult);

      expect(authService.signUp(authCredentialsDto)).resolves.toEqual(
        expectedResult,
      );
    });
  });

  describe('refresh', () => {
    const refreshDto: RefreshCredentialsDto = {
      refreshToken: 'testToken',
      fingerprint: 'testFingerprint',
    };

    const testPayload: JwtPayload = {
      username: 'testUsername',
    };

    beforeEach(() => {
      jest.spyOn(sessionRepository, 'update').mockResolvedValue(null);
    });

    it('throws unathorized as refreshToken is expired', () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw Error;
      });

      return expect(authService.refresh(refreshDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
    it('throws unathorized as something wrong with credentials', () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue(testPayload);
      jest.spyOn(sessionRepository, 'checkSession').mockResolvedValue(null);
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw Error;
      });

      return expect(authService.refresh(refreshDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
    it('successfully refresh tokens', () => {
      const expected: TokensDto = {
        accessToken: 'testToken',
        refreshToken: 'testToken',
      };

      jest.spyOn(jwtService, 'verify').mockReturnValue(testPayload);
      jest
        .spyOn(sessionRepository, 'checkSession')
        .mockResolvedValue(new Session());

      jest
        .spyOn(sessionRepository, 'checkSession')
        .mockResolvedValue(new Session());
      jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');

      expect(authService.refresh(refreshDto)).resolves.toEqual(expected);
    });
  });
});
