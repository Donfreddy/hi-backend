import { MailService } from './mail/mail.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MailDto } from './mail/mail.dto';
import {
  SubscribeDto,
  SendNewLetterDto,
} from './models/newsletter/dto/newsletter.dto';
import { NewsletterService } from './models/newsletter/newsletter.service';
import { ResponseMessage } from './common/decorators/response.decorator';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(
    private readonly mail: MailService,
    private readonly newsletter: NewsletterService,
  ) {}

  @Post('/send-mail')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Send mail successfully.')
  @ApiOperation({ summary: 'Send mail to House innovation.' })
  @ApiBody({ description: 'Send mail to House innovation.', type: MailDto })
  create(@Body() inputs: MailDto) {
    return this.mail.sendMail(inputs);
  }

  @Post('/newsletter/subscribe')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscribe to newsletter successfully.')
  @ApiOperation({ summary: 'Subscribe to newsletter.' })
  @ApiBody({ description: 'Subscribe to newsletter.', type: SubscribeDto })
  subscribe(@Body() inputs: SubscribeDto) {
    return this.newsletter.subscribe(inputs);
  }

  @Post('/newsletter/send')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Send newsletter successfully')
  @ApiOperation({ summary: 'Send newsletter.' })
  @ApiBody({ description: 'Send newsletter.', type: SendNewLetterDto })
  send(@Body() inputs: SendNewLetterDto) {
    return this.newsletter.sendNewsletter(inputs);
  }

  @Post('/newsletter/unsubscribe/:hashed_email')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Unsubscribe from newsletter successfully.')
  @ApiOperation({ summary: 'Unsubscribe from newsletter.' })
  @ApiBody({ description: 'Unsubscribe from newsletter.', type: SubscribeDto })
  @ApiParam({ name: 'hashed_email', type: 'string' })
  unsubscribe(@Param('hashed_email') hashedEmail: string) {
    return this.newsletter.unsubscribe(hashedEmail);
  }
}
