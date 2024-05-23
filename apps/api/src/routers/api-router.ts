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
    /**
     * @openapi
     * /api/healthcheck:
     *  get:
     *    tags:
     *      - Healthcheck
     *    description: API Healthcheck
     *    responses:
     *      200:
     *        description: API is up and running
     */
    this.router.get('/');
    this.router.get('/healthcheck', (req, res) => res.status(200).json({ message: 'API is up and running!' }));
    this.router.use('/sample', this.sampleRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
