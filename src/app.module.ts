import { TokenModule } from './models/token/token.module';
import { ProjectModule } from './models/project/project.module';
import { LocalFileModule } from './models/local-file/local-file.module';
import { CommentModule } from './models/comment/comment.module';
import { UserModule } from './models/user/user.module';
import { ArticleModule } from './models/article/article.module';
import { JobModule } from './models/job/job.module';
import { AuthModule } from './auth/auth.module';
import { NewsletterModule } from './models/newsletter/newsletter.module';
import { MailModule } from './mail/mail.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './common/interceptors/transform.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    TokenModule,
    ProjectModule,
    LocalFileModule,
    CommentModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),

    ArticleModule,
    JobModule,
    AuthModule,
    NewsletterModule,
    MailModule,
    NewsletterModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
