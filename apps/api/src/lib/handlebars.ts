import path from 'path';
import { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';

export const handlebarsOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    extname: '.handlebars',
    defaultLayout: false,
    layoutsDir: path.resolve(__dirname, '../templates'),
    partialsDir: path.resolve(__dirname, '../templates'),
  },
  viewPath: path.resolve(__dirname, '../templates'),
  extName: '.handlebars',
};
