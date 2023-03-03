import { Article } from 'src/models/article/entities/article.entitty';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  caditate_desc: string;

  @Column({ type: 'simple-array' })
  advantages: string[];

  // @Column({ type: 'simple-array' })
  // requirements: string[];

  // @Column({ type: 'simple-array' })
  // responsibilities: string[];

  // @Column({ type: 'simple-array' })
  // skills: string[];

  @Column()
  dealine: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
