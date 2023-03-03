import { NewsletterController } from './newsletter.controller';
import { Subscriber } from './entities/subscriber.entity';
import { NewsletterService } from './newsletter.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [NewsletterController],
  providers: [NewsletterService, MailService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
