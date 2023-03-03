import { LocalFile } from './../local-file/entities/local-file.entity';
import { LocalFileService } from './../local-file/local-file.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Module } from '@nestjs/common';
import { Article } from './entities/article.entitty';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/entities/comment.entitty';

@Module({
  imports: [TypeOrmModule.forFeature([Article,Comment,LocalFile])],
  controllers: [ArticleController],
  providers: [ArticleService, CommentService,LocalFileService],
})
export class ArticleModule {}
