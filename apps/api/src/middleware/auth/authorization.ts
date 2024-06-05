import { NextFunction, Request, Response } from 'express';
import { IAuthTokenPayload } from '../../model/auth-model';
import { ResponseError } from '../../helpers/response-error';
import { Role } from '@prisma/client';

export default function authorization(role: Role) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as IAuthTokenPayload;
      if (!user) throw new ResponseError(403, 'Unauthorized access');
      if (user.role !== role) throw new ResponseError(403, 'Unauthorized access');
      next();
    } catch (error) {
      next(error);
    }
  };
}
