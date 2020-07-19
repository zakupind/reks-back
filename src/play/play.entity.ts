import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { Seed } from '../seed/seed.entity';
import { GameEnum } from './types/game.enum';

@Entity()
export class Play extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  game: GameEnum;

  @Column()
  betAmount: number;

  @Column('decimal', { nullable: true })
  multiplier: number;

  @Column({ default: 0 })
  cursor: number;

  @Column({ default: 0 })
  inlineCursor: number;

  @Column()
  nonce: number;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(type => User, user => user.plays, { eager: false })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(type => Seed, seed => seed.plays, { eager: false })
  seed: Seed;

  @Column()
  seedId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
