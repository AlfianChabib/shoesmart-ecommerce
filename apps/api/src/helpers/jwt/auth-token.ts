import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { IAuthTokenPayload } from '../../model/auth-model';

export function generateAccessToken(payload: IAuthTokenPayload) {
  return sign(payload, process.env.JWT_ACCESS_SECRET_TOKEN, {
    expiresIn: process.env.JWT_ACCESS_LIFETIME,
    algorithm: 'HS256',
  });
}

export function generateRefreshToken(payload: IAuthTokenPayload) {
  return sign(payload, process.env.JWT_REFRESH_SECRET_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_LIFETIME,
    algorithm: 'HS256',
  });
}

export function generateAuthTokens(payload: IAuthTokenPayload) {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
}

export function verifyRefreshToken(token: string): IAuthTokenPayload | undefined {
  try {
    return verify(token, process.env.JWT_REFRESH_SECRET_TOKEN, {
      algorithms: ['HS256'],
    }) as IAuthTokenPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('This token is expired');
      }
    }
  }
}
