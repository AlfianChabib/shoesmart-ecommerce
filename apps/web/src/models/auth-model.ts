import { z } from 'zod';
import { AuthValidation } from '@/validation/auth-validation';

export type RegisterPayload = z.infer<typeof AuthValidation.register>;

export type VerificationPayload = z.infer<typeof AuthValidation.verification>;

export type LoginPayload = z.infer<typeof AuthValidation.login>;

export type ForgotPasswordPayload = z.infer<typeof AuthValidation.forgotPassword>;
