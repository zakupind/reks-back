import { UnauthorizedException } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

const authCredentialsDto: AuthCredentialsDto = {
  username: 'testUser',
  password: 'testPassword',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, UserRepository, JwtStrategy],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should throw unauthorized exception as password is invalid', () => {
      const validate = jest
        .spyOn(userRepository, 'validateUserPassword')
        .mockResolvedValue(undefined);

      expect(validate).not.toHaveBeenCalled();

      expect(authService.signIn(authCredentialsDto)).rejects.toThrow(
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
        .mockResolvedValue('test');
      jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');

      expect(userRepository.validateUserPassword).not.toHaveBeenCalled();

      expect(authService.signIn(authCredentialsDto)).resolves.toEqual(
        expectedResult,
      );
    });
  });
  describe('signUp', () => {
    it('should successfully register', () => {
      jest.spyOn(userRepository, 'signUp').mockResolvedValue(undefined);

      expect(authService.signUp(authCredentialsDto)).resolves.not.toThrow();
    });
  });
});
