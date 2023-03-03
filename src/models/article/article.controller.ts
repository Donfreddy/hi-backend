import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  BadRequestException,
  Body,
  UploadedFile,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import LocalFilesInterceptor from 'src/common/interceptors/local-files.interceptor';
import { CreateCommentDto } from '../comment/dto/comment.dto';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly article: ArticleService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Blog created successfully.')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
      path: '/images',
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.includes('image')) {
          return cb(new BadRequestException('Provide a valid image'), false);
        }
        cb(null, true);
      },
    }),
  )
  createBlog(
    @Body() createBlogDto: CreateArticleDto,
    @UploadedFile('file') image: Express.Multer.File,
  ) {
    const file = image
      ? {
          path: image.path,
          filename: image.filename,
          destination: image.destination,
          mimetype: image.mimetype,
        }
      : null;
    return this.article.create(createBlogDto, file);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all blogs successfully.')
  @ApiOperation({ summary: 'Get all blog.' })
  getAllBlog() {
    return this.article.getAll();
  }

  @Get('/publish')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get all published blogs successfully.')
  @ApiOperation({ summary: 'Get all published  blog.' })
  @ApiQuery({
    name: 'limit',
    description: 'Number of course to return',
    required: false,
  })
  getAllPublishedBlog(
    @Query('limit', new DefaultValuePipe(0), ParseIntPipe) limit: number,
  ) {
    return this.article.getAllPublished(limit);
  }

  @Get('/publish/:slug')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one blog successfully.')
  @ApiOperation({ summary: 'Get one blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  getBlog(@Param('slug') blogSlug: string) {
    return this.article.getPublished(blogSlug);
  }

  @Get(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Get one blog successfully.')
  @ApiOperation({ summary: 'Get one blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  getOneBlog(@Param('slug') blogSlug: string) {
    return this.article.get(blogSlug);
  }

  @Put(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog updated successfully.')
  @ApiOperation({ summary: 'Update blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
      path: '/images',
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.includes('image')) {
          return cb(new BadRequestException('Provide a valid image'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('slug') blogSlug: string,
    @Body() updateBlogDto: UpdateArticleDto,
    @UploadedFile('file') image: Express.Multer.File,
  ) {
    const file = image
      ? {
          path: image.path,
          filename: image.filename,
          destination: image.destination,
          mimetype: image.mimetype,
        }
      : null;
    return this.article.update(blogSlug, updateBlogDto, file);
  }

  @Put('publish/:slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog published successfully.')
  @ApiOperation({ summary: 'Publish blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  publish(@Param('slug') blogSlug: string) {
    return this.article.publish(blogSlug);
  }

  @Put('draft/:slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog published successfully.')
  @ApiOperation({ summary: 'Publish blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  draft(@Param('slug') blogSlug: string) {
    return this.article.draft(blogSlug);
  }

  @Delete(':slug')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Blog deleted successfully.')
  @ApiOperation({ summary: 'Delete blog.' })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  remove(@Param('slug') blogSlug: string) {
    return this.article.remove(blogSlug);
  }

  @Post(':slug/comments')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Comment created successfully.')
  @ApiOperation({ summary: 'Post comment.' })
  @ApiBody({ description: 'Post comment', type: CreateCommentDto })
  @ApiParam({
    name: 'slug',
    type: String,
    description: 'Blog slug',
    example: 'blog-title-mfatf1v6f',
  })
  postComment(
    @Param('slug') blogSlug: string,
    @Body() inputs: CreateCommentDto,
  ) {
    return this.article.postComment(blogSlug, inputs);
  }
}
