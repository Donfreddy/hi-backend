import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          // port: +configService.get('EMAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('EMAIL_ADDRESS'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
          tls: { rejectUnauthorized: false },
        },
        defaults: {
          from: '"House Innovation Group" <contact@houseinnovationgroup.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
