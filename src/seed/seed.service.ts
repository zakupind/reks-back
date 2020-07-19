import crypto from 'crypto';

import { Injectable } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { Seed } from './seed.entity';
import { SeedRepository } from './seed.repository';

@Injectable()
export class SeedService {
  constructor(private seedRepository: SeedRepository) {}

  async createUserHash(user: User, cursor = 0): Promise<string> {
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
    hmac.update(`${clientSeed}:${nonce}:${cursor}`);

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

  generateFloat(hash: string, inlineCursor = 0): number {
    const length = 8;
    const start = inlineCursor * length;
    const substr = hash.substr(start, length);
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
    const lastSeed = await this.seedRepository.findOne({
      where: {
        user,
        active: true,
      },
    });

    lastSeed.revealed = true;
    lastSeed.active = false;
    await this.seedRepository.update(lastSeed.id, lastSeed);

    const newSeed = await this.seedRepository.findOne({
      user,
      revealed: false,
      active: false,
    });

    newSeed.active = true;

    await this.seedRepository.update(newSeed.id, newSeed);

    await this.createSeed(user);
  }
}
