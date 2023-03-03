import { hashEmail } from './../../common/helpers/index';
import { SendNewLetterDto, SubscribeDto } from './dto/newsletter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepo: Repository<Subscriber>,
    private readonly mail: MailService,
  ) {}

  async subscribe(input: SubscribeDto): Promise<Subscriber> {
    // check if email already exists
    const foundSubscriber = await this.subscriberRepo.findOne({
      where: { email: input.email },
    });

    const hashedEmail = hashEmail(input.email);

    if (foundSubscriber && hashedEmail === foundSubscriber.hashed_email) {
      return foundSubscriber;
    }

    const subscriber = new Subscriber();
    subscriber.email = input.email;
    subscriber.hashed_email = hashedEmail;
    return this.subscriberRepo.save(subscriber);
  }

  // get all subscribers email
  async getSubscribersEmail(): Promise<string[]> {
    const subscribers: string[] = [];

    const allSubscribers = await this.subscriberRepo.find();
    await Promise.all(
      allSubscribers.map(async (subscriber) => {
        subscribers.push(subscriber.email);
      }),
    );

    return subscribers;
  }

  // send newsletter to subscribers
  async sendNewsletter(inputs: SendNewLetterDto) {
    const subscribersEmail = await this.getSubscribersEmail();

    await Promise.all(
      subscribersEmail.map(async (subscriberEmail) => {
        const hashedEmail = hashEmail(subscriberEmail);
        await this.mail.sendNewsletter(
          inputs.subject,
          inputs.content,
          subscriberEmail,
          hashedEmail,
        );
      }),
    );

    return { success: true };
  }

  // unsubscribe
  async unsubscribe(hashedEmail: string) {
    // check if email exists
    const foundSubscriber = await this.subscriberRepo.findOne({
      where: { hashed_email: hashedEmail },
    });

    if (!foundSubscriber) {
      throw new NotFoundException('Email not found');
    }

    await this.subscriberRepo.delete(foundSubscriber.id);
    return { success: true };
  }

  //h
}
