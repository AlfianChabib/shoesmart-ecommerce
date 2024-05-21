import { Router } from 'express';
import { SampleRouter } from './sample-router';

export class ApiRouter {
  private router: Router;
  private sampleRouter: SampleRouter;

  constructor() {
    this.sampleRouter = new SampleRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/');
    this.router.use('/sample', this.sampleRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
