import express, { json, urlencoded, Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApiRouter } from '../routers/api-router';
import { PORT } from './config';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        console.error('Error : ', err.stack);
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
    this.app.listen(process.env.PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}`);
    });
  }
}
