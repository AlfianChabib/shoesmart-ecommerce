import { Router } from 'express';
import { validate, ValidationType } from '../helpers/validation';
import { AuthValidation } from '../validations/auth-validation';
import { AuthController } from '../controllers/auth-controller';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post('/register', validate(AuthValidation.register, ValidationType.BODY), this.authController.register);
  }

  getRouter(): Router {
    return this.router;
  }
}
