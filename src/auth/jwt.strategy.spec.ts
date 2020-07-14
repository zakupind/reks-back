import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [JwtStrategy, UserRepository, ConfigService],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns the user based on JWT payload', async () => {
      const user = new User();
      user.username = 'TestUser';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'TestUser' });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'TestUser',
      });
      expect(result).toEqual(user);
    });
    it('throws an unathorized exception as user cannot be found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      return expect(
        jwtStrategy.validate({ username: 'TestUser' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
