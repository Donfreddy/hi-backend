import { Article } from 'src/models/article/entities/article.entitty';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'longtext' })
  content: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => Article, (article) => article.comments)
  @JoinColumn()
  article?: Article;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
