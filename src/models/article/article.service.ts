import { slugifyString } from './../../common/helpers/index';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { Article } from 'src/models/article/entities/article.entitty';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getImageUrl, slugOrIdWhereCondition } from 'src/common/helpers';
import { Repository } from 'typeorm';
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { LocalFileService } from '../local-file/local-file.service';
import { ILocalFile } from '../local-file/interfaces/local-file.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
    private readonly comment: CommentService,
    private localFile: LocalFileService,
  ) {}

  async create(
    inputs: CreateArticleDto,
    fileData: ILocalFile,
  ): Promise<Article> {
    const newArticle = new Article();

    newArticle.title = inputs.title;
    newArticle.description = inputs.description;
    newArticle.slug = slugifyString(inputs.title);
    newArticle.content = inputs.content;
    newArticle.category = inputs.category;
    newArticle.tags = inputs.tags;

    if (fileData) {
      await this.localFile.saveLocalFileData(fileData);
      newArticle.image = getImageUrl(fileData.filename);
    }

    return this.articleRepo
      .save(newArticle)
      .then((entity) => entity)
      .catch((error) => Promise.reject(error));
  }

  async getAll(): Promise<Article[]> {
    return this.articleRepo.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getAllPublished(limit?: number): Promise<Article[]> {
    console.log('limit', limit);
    const result = await this.articleRepo.find({
      where: { is_published: true },
      take: limit !== 0 ? limit : null,
      relations: {
        comments: true,
      },
      order: {
        publish_at: 'DESC',
      },
    });

    const articles: Article[] = result.map((blog) => {
      const { comments, ...details } = blog;

      return {
        ...details,
        comment_count: comments.length,
      };
    });

    return Promise.resolve(articles);
  }

  async get(blogSlug: string): Promise<Article> {
    const foundBlog = await this.articleRepo.findOne({
      where: slugOrIdWhereCondition(blogSlug),
    });

    if (!foundBlog) {
      throw new NotFoundException(`Article not fount with slug ${blogSlug}`);
    }

    return foundBlog;
  }

  async getPublished(blogSlug: string): Promise<Article> {
    const foundBlog = await this.articleRepo.findOne({
      where: { ...slugOrIdWhereCondition(blogSlug), is_published: true },
      relations: {
        comments: true,
      },
    });

    if (!foundBlog) {
      throw new NotFoundException(`Blog not fount with slug ${blogSlug}`);
    }

    return foundBlog;
  }

  async update(
    blogSlug: string,
    inputs: UpdateArticleDto,
    fileData: ILocalFile,
  ) {
    const foundBlog = await this.get(blogSlug);

    foundBlog.title = inputs.title;
    foundBlog.description = inputs.description;
    foundBlog.slug = slugifyString(inputs.title);
    foundBlog.content = inputs.content;
    foundBlog.category = inputs.category;
    foundBlog.tags = inputs.tags;

    if (fileData) {
      await this.localFile.deleteLocalFile(foundBlog.image);

      await this.localFile.saveLocalFileData(fileData);
      foundBlog.image = getImageUrl(fileData.filename);
    }

    return this.articleRepo
      .save(foundBlog)
      .then((entity) => entity)
      .catch((error) => Promise.reject(error));
  }

  async publish(blogSlug: string) {
    const foundBlog = await this.get(blogSlug);

    foundBlog.is_published = true;
    foundBlog.is_draft = false;
    foundBlog.publish_at = new Date();

    return this.articleRepo
      .save(foundBlog)
      .then((entity) => entity)
      .catch((error) => Promise.reject(error));
  }

  async draft(blogSlug: string) {
    const foundBlog = await this.get(blogSlug);

    foundBlog.is_published = false;
    foundBlog.is_draft = true;
    foundBlog.publish_at = null;

    return this.articleRepo
      .save(foundBlog)
      .then((entity) => entity)
      .catch((error) => Promise.reject(error));
  }

  async remove(blogSlug: string) {
    const foundBlog = await this.get(blogSlug);
    await this.articleRepo.softDelete(foundBlog.id);
    return { deleted: true };
  }

  async postComment(blogSlug: string, inputs: CreateCommentDto) {
    const foundBlog = await this.get(blogSlug);
    return this.comment.create(foundBlog, inputs);
  }
}
