import { Comment } from 'src/models/comment/entities/comment.entitty';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ default: false })
  is_published: boolean;

  @Column({ default: true })
  is_draft: boolean;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 'CAFMAC' })
  author: string;

  @OneToMany(() => Comment, (comment) => comment.article)
  @JoinColumn()
  comments?: Comment[];

  @Column({ nullable: true })
  publish_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
