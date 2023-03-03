import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  expired_at: Date;
}
