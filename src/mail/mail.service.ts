import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendConfirmationEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'hello@demomailtrap.com',
      to,
      subject,
      text,
    };

    // La capa gratuita de Mailtrap solo permite enviar correos a la dirección de correo electrónico que se ha registrado.
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar un mail: ', error);
    }
  }
}
