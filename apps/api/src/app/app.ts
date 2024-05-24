import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import passport, { PassportStatic } from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import env from './config';
import { ApiRouter } from '../routers/api-router';
import { corsOptions } from '../utils/cors-option';
import { logger } from '../utils/logger';
import { strategy } from '../lib/passport';
import { errorMiddleware } from '../middleware/error-middleware';

export default class App {
  private app: Express;
  private passport: PassportStatic;

  constructor() {
    this.app = express();
    this.passport = passport;
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(cors(corsOptions));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(this.passport.initialize());
    this.passport.use(strategy.localStrategy);
    this.passport.use(strategy.googleStrategy);
  }

  private handleError(): void {
    // not found
    this.app.use(errorMiddleware);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        logger.error('Not found : ', req.path);
        res.status(404).json({
          status: 'failed',
          message: 'Oops! Path not found!',
        });
      } else {
        next();
      }
    });

    // error
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        logger.error('Error : ', err.stack);
        res.status(500).send('Error !');
      } else {
        next();
      }
    });
  }

  private routes(): void {
    const apiRouter = new ApiRouter();
    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello from api !`);
    });
    this.app.use('/api', apiRouter.getRouter());
  }

  public start(): void {
    this.app.listen(env.PORT, () => {
      console.log(`   - [API] Local:  http://localhost:${env.PORT}`);
    });
  }
}
