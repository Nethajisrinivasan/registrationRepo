import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as nodemailer from 'nodemailer';

@Injectable()

export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
       this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
        user: 'ff28409e0940bf',
        pass: 'a58eccad44a722',

      },

    });

  }
  async sendMail(email: string, subject: string, text: string): Promise<void> {
    console.log('inside sendMail');
    await this.transporter.sendMail({
      from: 'sandbox.smtp.mailtrap.io',
      to:email,
      subject,
      text,

    });

  }
   generateVerificationCode() {
    console.log('inside generateVerificationCode');
    
     const code = Math.floor(100000 + Math.random() * 900000);
     console.log("the code is ", code);
     
    return code.toString();
  }

}