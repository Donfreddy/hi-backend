import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, default: '' })
  hashed_email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
