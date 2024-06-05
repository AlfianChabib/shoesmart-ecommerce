import { Router } from 'express';
import { validate, ValidationType } from '../helpers/validation';
import { AuthValidation } from '../validations/auth-validation';
import { AuthController } from '../controllers/auth-controller';
import passport from 'passport';
import authorization from '../middleware/auth/authorization';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // google auth
    this.router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
    this.router.get('/google/callback', this.authController.googleCallback);

    // local auth
    this.router.post('/register', validate(AuthValidation.register, ValidationType.BODY), this.authController.register);
    this.router.get(
      '/register/check/:token',
      validate(AuthValidation.checkVerifyToken, ValidationType.PARAMS),
      this.authController.checkVerificationToken,
    );
    this.router.post(
      '/register/verify',
      validate(AuthValidation.verification, ValidationType.BODY),
      this.authController.verificationRegister,
    );
    this.router.post('/login', validate(AuthValidation.login, ValidationType.BODY), this.authController.login);
    this.router.post('/refresh', this.authController.refreshToken);
    this.router.get('/session', authorization('Buyer'), this.authController.session);
  }

  getRouter(): Router {
    return this.router;
  }
}
