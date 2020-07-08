import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import bcryptjs from 'bcryptjs';
import { PostgresError } from 'pg-error-enum';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = this.create();

    user.username = username;
    user.salt = await bcryptjs.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === PostgresError.UNIQUE_VIOLATION) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User | null> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcryptjs.hash(password, salt);
  }
}
