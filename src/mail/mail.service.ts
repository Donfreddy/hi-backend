import { ConfigService } from '@nestjs/config';
import { SendNewLetterDto } from '../models/newsletter/dto/newsletter.dto';

import { Injectable } from '@nestjs/common';
import { MailDto } from './mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { configService } from 'src/config/config.service';
import { User } from 'src/models/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  // send mail to house innovation
  async sendMail(inputs: MailDto) {
    await this.mailer.sendMail({
      to: 'freddytamwo@gmail.com',
      from: `${inputs.contact.name} <${inputs.contact.email}>`,
      subject: inputs.subject,
      template: './send-mail',
      context: {
        contact: inputs.contact,
        body: inputs.body,
        subject: inputs.subject,
      },
    });
  }

  async sendPasswordResetEmail(user: User, token: string) {
    const clientUrl = configService.getClientUrl();
    await this.mailer.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: './reset-password',
      context: {
        name: user.first_name,
        link: `${clientUrl}/reset-password/token=${token}&id=${user.id}`,
      },
    });
  }

  // send newsletter to subscribers
  async sendNewsletter(
    subject: string,
    body: string,
    subscriberEmail: string,
    hashedEmail: string,
  ) {
    const clientUrl = 'https://houseinnovationgroup.com';
    await this.mailer.sendMail({
      to: subscriberEmail,
      subject: subject,
      template: './send-newsletter',
      context: {
        title: 'House Innovation Group Newsletter',
        body: body,
        unsubscriberEmail: subscriberEmail,
        subject: subject,
        websiteUrl: clientUrl,
        unSubscribeUrl: `${clientUrl}/newsletter/unsubscribe/${hashedEmail}`,
        contact: {
          email: 'info@houseinnovationgroup.com',
          phone: '+237 6 97 09 88 59',
        },
      },
    });
  }
}
