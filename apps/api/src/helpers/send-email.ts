import hbs from 'nodemailer-express-handlebars';
import { transporter } from '../lib/nodemailer';
import { handlebarsOptions } from '../lib/handlebars';
import { ResponseError } from './response-error';
import { logger } from '../utils/logger';

export const sendEmail = async (
  toEmail: string,
  subject: string,
  context: Record<string, unknown>,
  template: string,
) => {
  try {
    transporter.verify((error, success) => {
      if (error) logger.error(error);
      console.log('Server is ready to take our messages');
    });

    transporter.use('compile', hbs(handlebarsOptions));

    const mailOptions = {
      from: 'Shoesmart Ecommerce <alfianchabib109@gmail.com>',
      to: toEmail,
      subject: subject,
      template,
      context,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      throw new ResponseError(500, error.message);
    }
  }
};
