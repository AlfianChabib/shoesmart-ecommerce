import { z } from 'zod';
import { AuthValidation } from '@/validation/auth-validation';

export type RegisterPayload = z.infer<typeof AuthValidation.register>;

export type VerificationPayload = z.infer<typeof AuthValidation.verification>;

export type LoginPayload = z.infer<typeof AuthValidation.login>;

export type ForgotPasswordPayload = z.infer<typeof AuthValidation.forgotPassword>;

export type ResetPasswordPayload = z.infer<typeof AuthValidation.resetPassword>;

export type ChangePasswordPayload = z.infer<typeof AuthValidation.changePassword>;

export type ValidateOTPPayload = z.infer<typeof AuthValidation.validateOTP>;
