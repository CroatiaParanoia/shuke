import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @CreateDateColumn()
  @Index()
  createAt: Date;

  @UpdateDateColumn()
  @Index()
  updateAt: Date;

  @DeleteDateColumn()
  @Index()
  deleteAt: Date;
}
