import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter

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

    async sendConfirmationEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'hello@demomailtrap.com',
            to,
            subject,
            text,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
