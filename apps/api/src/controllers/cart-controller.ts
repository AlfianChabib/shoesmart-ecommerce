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
}
