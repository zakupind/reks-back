import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  fingerprint: string;

  @ManyToOne(type => User, user => user.sessions, {
    eager: false,
  })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
