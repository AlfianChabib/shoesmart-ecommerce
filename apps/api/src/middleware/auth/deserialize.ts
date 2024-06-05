import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ResponseError } from '../../helpers/response-error';
import { IAuthTokenPayload } from '../../model/auth-model';

export interface RequestWithUser {
  user: IAuthTokenPayload;
}

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (accessToken === undefined) {
      return next();
    }
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET_TOKEN,
      function (err, decoded: string | jwt.JwtPayload | undefined | IAuthTokenPayload) {
        if (err instanceof jwt.TokenExpiredError) {
          if (err.name === 'TokenExpiredError') {
            throw new ResponseError(403, 'Token expired');
          }
          throw new ResponseError(401, 'Invalid token');
        } else {
          res.locals.session = decoded;
          req.user = decoded as IAuthTokenPayload;
          next();
        }
      },
    );
  } catch (error) {
    next(error);
  }
};
