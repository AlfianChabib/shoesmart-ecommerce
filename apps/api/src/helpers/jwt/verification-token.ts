import { sign, verify, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { VerificationTokenPayload } from '../../model/auth-model';
import { hashToken } from '../hash-token';
import { ResponseError } from '../response-error';

interface IVerifyVerificationToken extends JwtPayload {
  userId: string;
  email: string;
  username: string;
}

export const signVerifyToken = (payload: VerificationTokenPayload): string => {
  return sign(payload, process.env.JWT_VERIFICATION_SECRET_TOKEN, {
    expiresIn: process.env.JWT_VERIFICATION_LIFETIME,
    algorithm: 'HS256',
  });
};

export const verifyVerificationToken = (token: string): IVerifyVerificationToken | undefined => {
  try {
    return verify(token, process.env.JWT_VERIFICATION_SECRET_TOKEN, {
      algorithms: ['HS256'],
    }) as IVerifyVerificationToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      if (error.name === 'TokenExpiredError') {
        throw new ResponseError(400, 'This token is expired');
      }
    }
  }
};

export const genVerification = (
  payload: VerificationTokenPayload,
): { hashedToken: string; verificationUrl: string } => {
  const token = signVerifyToken(payload);

  const hashedToken = hashToken(token);

  const verificationUrl = `${process.env.BASE_FRONTEND_URL}/sign-up/verification?token=${token}`;

  return { hashedToken, verificationUrl };
};
