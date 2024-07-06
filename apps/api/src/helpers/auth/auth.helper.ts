import { AuthDetail, User } from '@prisma/client';
import { ResponseError } from '../response-error';

export const validateUserLogin = (user: (User & { authDetail: AuthDetail | null }) | null) => {
  if (!user) throw new ResponseError(401, 'Email not found, ');
  if (!user.authDetail || !user.authDetail.confirmed)
    throw new ResponseError(401, 'Email not verified, pleace verify your account');

  return user;
};
