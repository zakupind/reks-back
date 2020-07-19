import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';
import { Play } from '../play/play.entity';

@Entity()
export class Seed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serverSeed: string;

  @Column()
  serverSeedHashed: string;

  @Column()
  clientSeed: string;

  @Column({ default: 0 })
  nonce: number;

  @Column({ default: false })
  revealed: boolean;

  @Column({ default: false })
  active: boolean;

  @ManyToOne(type => User, user => user.seeds, { eager: false })
  user: User;

  @Column()
  userId: number;

  @OneToMany(type => Play, play => play.seed, { eager: false })
  plays: Play[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
