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

import { TokensDto } from './dto/tokens.dto';
import { JwtPayload } from './jwt-payload.interface';
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

  @OneToMany(type => Session, session => session.user, { eager: true })
  sessions: Session[];

  async validatePassword(password: string): Promise<boolean> {
    const hashed = await bcryptjs.hash(password, this.salt);
    return hashed === this.password;
  }
}
