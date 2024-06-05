import { Response } from 'express';
import env from '../../app/config';

export async function sendCookie(res: Response, refreshToken: string, accessToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/',
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    path: '/',
  });
}
