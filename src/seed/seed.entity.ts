import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';

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

  @Column({ default: 1 })
  nonce: number;

  @Column({ default: false })
  revealed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => User, user => user.id, { eager: false })
  user: User;

  @Column()
  userId: number;
}
