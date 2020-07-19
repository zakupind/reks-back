import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
