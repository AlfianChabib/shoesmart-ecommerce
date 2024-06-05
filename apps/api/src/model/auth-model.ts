import * as z from 'zod';
import { AuthValidation } from '../validations/auth-validation';
import { Role } from '@prisma/client';

export type RegisterPayload = z.infer<typeof AuthValidation.register>;

export type CheckVerifyTokenPayload = z.infer<typeof AuthValidation.checkVerifyToken>;

export type VerificationPayload = z.infer<typeof AuthValidation.verification>;

export type LoginPayload = z.infer<typeof AuthValidation.login>;

export type ForgotPasswordPayload = z.infer<typeof AuthValidation.forgotPassword>;

export type ResetPasswordPayload = z.infer<typeof AuthValidation.resetPassword>;

export type ChangeEmailPayload = z.infer<typeof AuthValidation.changeEmail>;

export type VerificationTokenPayload = {
  email: string;
  username: string;
};

export interface IAuthTokenPayload {
  userId: string;
  email: string;
  role: Role;
}
