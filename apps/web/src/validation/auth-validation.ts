import { z } from 'zod';

export class AuthValidation {
  static readonly register = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  });

  static readonly verification = z
    .object({
      token: z.string({ required_error: 'Token is required' }),
      password: z.string().min(8, { message: 'Password must be at least 6 characters' }),
      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({ code: 'custom', message: 'Passwords do not match', path: ['confirmPassword'] });
      }
    });

  static readonly login = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(8, { message: 'Password must be at least 6 characters' }),
  });

  static readonly forgotPassword = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
  });
}
