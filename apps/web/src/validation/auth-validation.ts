import { z } from 'zod';

export class AuthValidation {
  static readonly register = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(20, { message: 'Username must be at most 20 characters' }),
  });

  static readonly verification = z
    .object({
      token: z.string({ required_error: 'Token is required' }),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(64, { message: 'Password must be at most 64 characters' }),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] });
      }
    });

  static readonly login = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(64, { message: 'Password must be at most 64 characters' }),
  });

  static readonly forgotPassword = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
  });

  static readonly validateOTP = z.object({
    otp: z.string().min(6, {
      message: 'Your one-time password must be 6 characters.',
    }),
    userId: z.string({ required_error: 'User ID is required' }),
  });

  static readonly resetPassword = z
    .object({
      token: z.string().optional(),
      password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(64, { message: 'Password must be at most 64 characters' }),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] });
      }
    });

  static readonly changePassword = z
    .object({
      oldPassword: z
        .string()
        .min(8, { message: 'Old password must be at least 8 characters' })
        .max(64, { message: 'Old password must be at most 64 characters' }),
      newPassword: z
        .string()
        .min(8, { message: 'New password must be at least 8 characters' })
        .max(64, { message: 'New password must be at most 64 characters' }),
      confirmNewPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.newPassword !== data.confirmNewPassword) {
        ctx.addIssue({ code: 'custom', message: 'New passwords do not match', path: ['confirmNewPassword'] });
      }
    });
}
