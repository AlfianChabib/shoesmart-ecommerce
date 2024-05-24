import { NextFunction, Request, Response } from 'express';
import { RegisterPayload } from '../model/auth-model';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: RegisterPayload = req.body;

      console.log(payload);

      return res.status(202).json({
        message: 'Register success',
      });
    } catch (error) {
      next(error);
    }
  }
}
