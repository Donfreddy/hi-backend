import { Article } from 'src/models/article/entities/article.entitty';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entitty';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(blog: Article, inputs: CreateCommentDto) {
    const newComment = new Comment();
    newComment.content = inputs.content;
    newComment.author = inputs.author;
    newComment.article = blog;
    await this.commentRepo.save(newComment);

    return {
      comment: _.pick(newComment, ['id', 'content', 'author', 'email']),
    };
  }

  async getAll(): Promise<Comment[]> {
    const result = await this.commentRepo.find({
      relations: {
        article: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const comments: Comment[] = result.map((comment) => {
      const { article, ...details } = comment;

      return {
        ...details,
        article_id: article?.id || null,
      };
    });

    return Promise.resolve(comments);
  }

  async get(commentId: number): Promise<Comment> {
    const foundComment = await this.getWhere('id', commentId, ['blog']);

    if (!foundComment) {
      throw new NotFoundException(`Comment not fount with id #${commentId}`);
    }

    const { article, ...details } = foundComment;

    return Promise.resolve({
      ...details,
      article_id: article?.id || null,
    });
  }

  async update(commentId: number, inputs: UpdateCommentDto) {
    const foundComment = await this.get(commentId);
    await this.commentRepo.update(foundComment.id, inputs);
    return await this.get(commentId);
  }

  async remove(commentId: number) {
    const foundInstructor = await this.get(commentId);
    await this.commentRepo.softDelete(foundInstructor.id);
    return { deleted: true };
  }

  async getWhere(
    key: string,
    value: any,
    relations: string[] = [],
  ): Promise<Comment | null> {
    return this.commentRepo.findOne({ where: { [key]: value }, relations });
  }
}
