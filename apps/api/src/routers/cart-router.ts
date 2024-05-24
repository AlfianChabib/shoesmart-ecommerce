import { Router } from 'express';
import { CartController } from '../controllers/cart-controller';
import { validate, ValidationType } from '../helpers/validation';
import { CartValidation } from '../validations/cart-validation';

export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.cartController = new CartController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post('/', validate(CartValidation.CARTBODY, ValidationType.BODY), this.cartController.addCart);
    this.router.patch('/', validate(CartValidation.CARTBODY, ValidationType.BODY), this.cartController.updateCart);
  }

  getRouter(): Router {
    return this.router;
  }
}
