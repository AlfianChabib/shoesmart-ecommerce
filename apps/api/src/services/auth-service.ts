import env from '../app/config';
import dayjs from 'dayjs';
import { User } from '@prisma/client';
import { prisma } from '../app/prisma';
import { hashToken } from '../helpers/hash-token';
import { sendCookie } from '../helpers/auth/send-cookie';
import { ResponseError } from '../helpers/response-error';
import { EmailTemplate } from '../helpers/template';
import { NextFunction, Response } from 'express';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { comparePassword, hashPassword } from '../lib/bcrypt';
import { genVerification, verifyVerificationToken } from '../helpers/jwt/verification-token';
import { generateAccessToken, generateAuthTokens, verifyRefreshToken } from '../helpers/jwt/auth-token';
import {
  ForgotPasswordPayload,
  IAuthTokenPayload,
  LoginPayload,
  RegisterPayload,
  VerificationPayload,
} from '../model/auth-model';
import { sessionResponse } from '../helpers/auth/session';

export class AuthService {
  static async register(payload: RegisterPayload) {
    const existEmail = await prisma.user.count({ where: { email: payload.email } });
    if (existEmail > 0) throw new ResponseError(400, 'Email already exist');

    const { verificationUrl, hashedToken } = genVerification(payload);
    await EmailTemplate.verificationEmail({ ...payload, verificationUrl });

    await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.username,
        authDetail: { create: { email: payload.email, tokenVerification: hashedToken } },
      },
    });
  }

  static async checkToken(token: string) {
    const hashedToken = hashToken(token);
    const verifyToken = verifyVerificationToken(token);
    if (!verifyToken) throw new ResponseError(400, 'Invalid token');

    const existToken = await prisma.user.findUnique({
      where: { email: verifyToken.email, authDetail: { tokenVerification: hashedToken } },
      include: { authDetail: { select: { confirmed: true } } },
    });
    if (!existToken) throw new ResponseError(400, 'This token is expired');

    if (existToken.authDetail?.confirmed === false && !verifyToken)
      throw new ResponseError(400, 'This email is not verified, resend verification email?');
  }

  static async verificationRegister(payload: VerificationPayload) {
    const verifyToken = verifyVerificationToken(payload.token);
    if (!verifyToken) throw new ResponseError(400, 'Invalid token');

    const hashedPasword = hashPassword(payload.password);

    await prisma.user.update({
      where: { email: verifyToken.email },
      data: { authDetail: { update: { confirmed: true, tokenVerification: null, password: hashedPasword } } },
    });
  }

  static async login(payload: LoginPayload) {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email }, include: { authDetail: true } });
    if (!existUser) throw new ResponseError(400, 'Email not found');
    if (!existUser.authDetail || !existUser.authDetail.confirmed)
      throw new ResponseError(400, 'Email not verified, pleace verify your account');

    const isMatch = comparePassword(payload.password, existUser.authDetail.password!);
    if (!isMatch) throw new ResponseError(400, 'Wrong email or password');

    const { refreshToken, accessToken } = generateAuthTokens({
      userId: existUser.id,
      email: existUser.email,
      role: existUser.role,
    });

    await prisma.authDetail.update({
      where: { userId: existUser.id },
      data: { token: { create: { token: hashToken(refreshToken), expiredAt: dayjs().add(7, 'days').toDate() } } },
    });

    return { refreshToken, accessToken };
  }

  static async googleVerify(profile: Profile, done: VerifyCallback) {
    try {
      if (!profile || !profile._json || !profile._json.email) throw new Error('Profile not found');
      const email = profile._json.email;
      const user = await prisma.user.findUnique({ where: { email }, include: { authDetail: true } });
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            email,
            username: profile.displayName,
            userProfile: { create: { email: email, username: profile.displayName, avatarUrl: profile._json.picture } },
            authDetail: { create: { email, confirmed: true, authType: 'Google' } },
          },
        });
        return done(null, newUser);
      } else if (user.authDetail?.authType !== 'Google') {
        throw new Error('User already exist but not google account, login with email');
      } else {
        return done(null, user);
      }
    } catch (error) {
      throw error;
    }
  }

  static async googleCallback(user: User, err: Error, res: Response, next: NextFunction) {
    if (!user) return res.redirect(`${env.BASE_FRONTEND_URL}/sign-in?error=Social authentication failed`);
    if (err) next(err);
    const { accessToken, refreshToken } = generateAuthTokens({ userId: user.id, email: user.email, role: user.role });

    await prisma.authDetail.update({
      where: { userId: user.id },
      data: { token: { create: { token: hashToken(refreshToken), expiredAt: dayjs().add(7, 'days').toDate() } } },
    });

    await sendCookie(res, refreshToken);
    return res.redirect(`http://localhost:3000/sign-in?accessToken=${accessToken}`);
  }

  static async refreshNewToken(refreshToken: string): Promise<{ accessToken: string }> {
    const { userId, email, role } = verifyRefreshToken(refreshToken) as IAuthTokenPayload;
    if (!userId) throw new ResponseError(401, 'Refresh token not found');
    const hashedToken = hashToken(refreshToken);

    const existToken = await prisma.authDetail.findUnique({
      where: { userId, token: { some: { token: hashedToken } } },
    });
    if (!existToken) throw new ResponseError(401, 'Refresh token not found');
    const accessToken = generateAccessToken({ userId, email, role });
    return { accessToken };
  }

  static async forgotPassword(payload: ForgotPasswordPayload) {
    const existUser = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!existUser) throw new ResponseError(400, 'Email not found');

    await EmailTemplate.forgotPassword(payload.email);
  }

  static async getSession(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true },
    });
    if (!user) throw new ResponseError(400, 'User not found');
    return sessionResponse(user);
  }

  static async logout(userId: string, refreshToken: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { authDetail: { include: { token: true } } },
    });
    if (!user) throw new ResponseError(400, 'User not found');

    await prisma.authDetail.update({
      where: { userId },
      data: { token: { deleteMany: { token: hashToken(refreshToken) } } },
    });
  }
}
