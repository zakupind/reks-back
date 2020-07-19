import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedRepository } from '../seed/seed.repository';
import { SeedService } from '../seed/seed.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SessionRepository } from './session.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
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
    TypeOrmModule.forFeature([
      UserRepository,
      SessionRepository,
      SeedRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SeedService],
  exports: [AuthService],
})
export class AuthModule {}
