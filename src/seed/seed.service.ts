import crypto from 'crypto';

import { Injectable } from '@nestjs/common';

import { User } from '../auth/user.entity';
import { GetHashesDto } from './dto/get-hashes.dto';
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
    const { serverSeed, clientSeed, nonce } = seed;

    const hmac = crypto.createHmac('sha256', serverSeed);
    hmac.update(`${clientSeed}:${nonce}:${cursor}`);

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
    return numberFromSubstr / maxValue;
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
    for (let i = 1; i <= amount; i++) {
      await this.createSeed(user);
    }
  }

  async revealSeed(user: User, clientSeed: string): Promise<void> {
    const { currentSeed, nextSeed } = await this.seedRepository.getUserSeeds(
      user,
    );

    currentSeed.revealed = true;
    currentSeed.active = false;
    nextSeed.active = true;
    if (clientSeed) nextSeed.clientSeed = clientSeed;

    await this.seedRepository.save([currentSeed, nextSeed]);

    await this.createSeed(user);
  }

  async getHashes(user: User): Promise<GetHashesDto> {
    const {
      currentSeed: { nonce, clientSeed, serverSeedHashed },
      nextSeed: {
        serverSeedHashed: nextServerSeedHashed,
        clientSeed: nextClientSeed,
      },
    } = await this.seedRepository.getUserSeeds(user);

    return {
      nonce,
      clientSeed,
      serverSeedHashed,
      nextClientSeed,
      nextServerSeedHashed,
    };
  }

  async increaseNonce(user: User): Promise<Seed> {
    const seed = await this.seedRepository.findOne({
      user,
      active: true,
      revealed: false,
    });
    seed.nonce += 1;
    return this.seedRepository.save(seed);
  }
}
