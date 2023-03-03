import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { Comment } from './entities/comment.entitty';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
