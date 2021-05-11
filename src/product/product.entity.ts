import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Maker } from './maker.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  memoryHdd: number;

  @Column({ nullable: true })
  memorySsd: number;

  @Column({ nullable: true })
  ram: number;

  @Column({ nullable: true })
  cpuName: string;

  @Column({ nullable: true })
  cpuSpeed: number;

  @Column({ nullable: true })
  cpuCore: number;

  @Column({type: 'float', nullable: true})
  diagonal: number;

  @Column({ nullable: true })
  screenResolution: string;

  @Column({ nullable: true })
  camera: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Category, category => category, { eager: true })
  @JoinTable()
  category?: Category

  @Column()
  categoryId: number;

  @ManyToOne(() => Maker, maker => maker, { eager: true })
  @JoinTable()
  maker?: Maker

  @Column()
  makerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
