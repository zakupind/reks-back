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

import { Product } from './product.entity';

@Entity()
export class Maker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameMaker: string;

  @ManyToOne(() => Product, product => product.maker, { eager: false })
  product: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
