import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const dirTemplate = join(__dirname, 'templates');
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get('EMAIL_APP_HOST'),
            port: +config.get('EMAIL_APP_PORT'),
            secure: true, // true for 465, false for other ports
            auth: {
              user: config.get('EMAIL_APP_USER'),
              pass: config.get('EMAIL_APP_PASS'),
            },
          },
          template: {
            dir: dirTemplate,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: false,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
