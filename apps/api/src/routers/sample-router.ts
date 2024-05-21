import { SampleController } from '../controllers/sample-controller';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {}

  getRouter(): Router {
    return this.router;
  }
}
