import bcryptjs from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Play } from '../play/play.entity';
import { Seed } from '../seed/seed.entity';
import { Session } from './session.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Session, session => session.user, { eager: false })
  sessions: Session[];

  @OneToMany(type => Seed, seed => seed.user, { eager: false })
  seeds: Seed[];

  @OneToMany(type => Play, play => play.user, { eager: false })
  plays: Play[];

  async validatePassword(password: string): Promise<boolean> {
    const hashed = await bcryptjs.hash(password, this.salt);
    return hashed === this.password;
  }
}
