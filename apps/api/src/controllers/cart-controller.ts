import { NextFunction, Request, Response } from 'express';

export class CartController {
  async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        message: 'Routes cart',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const cartId = req.query.cartId;
      return res.status(200).json({
        status: 'success',
        message: 'Routes update cart with id ' + cartId,
      });
    } catch (error) {
      next(error);
    }
  }
}
