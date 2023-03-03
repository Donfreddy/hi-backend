import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { SubscribeDto, SendNewLetterDto } from './dto/newsletter.dto';
import { NewsletterService } from './newsletter.service';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Post('/subscribe')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Subscribe to newsletter successfully.')
  @ApiOperation({ summary: 'Subscribe to newsletter.' })
  @ApiBody({ description: 'Subscribe to newsletter.', type: SubscribeDto })
  subscribe(@Body() inputs: SubscribeDto) {
    return this.newsletter.subscribe(inputs);
  }

  @Post('/send')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Send newsletter successfully')
  @ApiOperation({ summary: 'Send newsletter.' })
  @ApiBody({ description: 'Send newsletter.', type: SendNewLetterDto })
  send(@Body() inputs: SendNewLetterDto) {
    return this.newsletter.sendNewsletter(inputs);
  }

  @Post('/unsubscribe/:hashed_email')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Unsubscribe from newsletter successfully.')
  @ApiOperation({ summary: 'Unsubscribe from newsletter.' })
  @ApiBody({ description: 'Unsubscribe from newsletter.', type: SubscribeDto })
  @ApiParam({ name: 'hashed_email', type: 'string' })
  unsubscribe(@Param('hashed_email') hashedEmail: string) {
    return this.newsletter.unsubscribe(hashedEmail);
  }
}
