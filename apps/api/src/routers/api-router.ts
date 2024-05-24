import { Router } from 'express';
import { AuthRouter } from './auth-router';
import { CartRouter } from './cart-router';

export class ApiRouter {
  private router: Router;
  private authRouter: AuthRouter;
  private cartRouter: CartRouter;

  constructor() {
    this.authRouter = new AuthRouter();
    this.cartRouter = new CartRouter();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/');
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/cart', this.cartRouter.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}