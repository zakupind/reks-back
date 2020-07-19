import crypto from 'crypto';

import { Injectable } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { Seed } from './seed.entity';
import { SeedRepository } from './seed.repository';

@Injectable()
export class SeedService {
  constructor(private seedRepository: SeedRepository) {}

  async createUserHash(user: User): Promise<string> {
    const seed = await this.seedRepository.findOne({
      where: {
        user,
        revealed: false,
        active: true,
      },
    });

    seed.nonce += 1;
    const { serverSeed, clientSeed, nonce } = seed;

    const hmac = crypto.createHmac('sha256', serverSeed);
    hmac.update(`${clientSeed}:${nonce}`);

    await this.seedRepository.update(seed.id, seed);

    return hmac.digest('hex');
  }

  randomHash(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  createHash(value: string): string {
    const hash = crypto.createHash('sha256');
    return hash.update(value).digest('hex');
  }

  generateFloat(hash: string): number {
    const substr = hash.substr(0, 8);
    const maxValue = 2 ** 32 - 1;

    const numberFromSubstr = parseInt(substr, 16);
    const float = numberFromSubstr / maxValue;

    return float;
  }

  async createSeed(user: User): Promise<Seed> {
    const activeSeed = await this.seedRepository.findOne({
      where: {
        user,
        active: true,
      },
    });

    const seed = this.seedRepository.create();
    seed.user = user;
    seed.serverSeed = this.randomHash();
    seed.serverSeedHashed = this.createHash(seed.serverSeed);
    seed.clientSeed = this.randomHash().substr(0, 8);

    if (!activeSeed) {
      seed.active = true;
    }

    await this.seedRepository.save(seed);
    return seed;
  }

  async createSeeds(user: User, amount: number): Promise<void> {
    const arr = new Array(amount);
    for (const each of arr) {
      await this.createSeed(user);
    }
  }

  async revealSeed(user: User): Promise<void> {
    const seed = await this.seedRepository.findOne({
      where: {
        userId: user.id,
        revealed: false,
      },
    });

    seed.revealed = true;
    await this.seedRepository.update(seed.id, seed);

    this.createSeed(user);
  }
}
