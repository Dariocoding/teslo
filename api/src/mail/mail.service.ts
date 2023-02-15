import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgetPassword } from './interfaces';
import { NAME_APP } from 'src/common/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async forgetPassword(object: ForgetPassword) {
    const { user, urlRecovery } = object;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"${NAME_APP}" <${this.config.get('EMAIL_APP_USER')}>`,
      subject: `Haz olvidao tu contraseña en ${NAME_APP}`,
      template: './forgetPassword',
      context: {
        name_app: NAME_APP,
        urlRecovery,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }
}
