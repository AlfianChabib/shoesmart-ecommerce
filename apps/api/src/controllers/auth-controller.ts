import { User } from '@prisma/client';
import { AuthService } from '../services/auth-service';
import { NextFunction, Request, Response } from 'express';
import {
  CheckVerifyTokenPayload,
  ForgotPasswordPayload,
  IAuthTokenPayload,
  LoginPayload,
  RegisterPayload,
  VerificationPayload,
} from '../model/auth-model';
import { sendCookie } from '../helpers/auth/send-cookie';
import { ResponseError } from '../helpers/response-error';
import passport from 'passport';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as RegisterPayload;

      await AuthService.register(payload);

      return res.status(202).json({ success: true, message: 'Verification url sent to your email' });
    } catch (error) {
      next(error);
    }
  }

  async checkVerificationToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params as CheckVerifyTokenPayload;

      await AuthService.checkToken(token);

      return res.status(200).json({ success: true, message: 'This token is valid' });
    } catch (error) {
      next(error);
    }
  }

  async verificationRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as VerificationPayload;

      await AuthService.verificationRegister(payload);

      return res.status(202).json({ success: true, message: 'Verification success, you can login now' });
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate('google', async (err: Error, user: User) => {
        AuthService.googleCallback(user, err, res, next);
      })(req, res);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as LoginPayload;

      const { refreshToken, accessToken } = await AuthService.login(payload);

      sendCookie(res, refreshToken, accessToken);

      return res.status(200).json({ success: true, message: 'Login success', accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new ResponseError(401, 'Refresh token not found');

      const { accessToken } = await AuthService.refreshNewToken(refreshToken);

      if (!accessToken) {
        res.clearCookie('refreshToken');
        throw new ResponseError(401, 'Refresh token not found');
      }

      return res.status(200).json({ success: true, message: 'Refresh new token success', accessToken });
    } catch (error) {
      next(error);
    }
  }

  async session(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IAuthTokenPayload;

      const session = await AuthService.getSession(user.userId);

      return res.status(200).json({ success: true, message: 'Session success', data: session });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as ForgotPasswordPayload;

      await AuthService.forgotPassword(data);

      return res.status(200).json({ success: true, message: 'Reset password url sent to your email' });
    } catch (error) {
      next(error);
    }
  }
}
