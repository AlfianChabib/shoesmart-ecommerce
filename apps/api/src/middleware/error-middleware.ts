import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../helpers/response-error';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.issues,
    });
  } else if (error instanceof ResponseError) {
    if (error.message === 'Unauthorized') {
      res.clearCookie('refreshToken');
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    } else {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
