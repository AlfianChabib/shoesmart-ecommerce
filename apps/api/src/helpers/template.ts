import { sendEmail } from './send-email';

export class EmailTemplate {
  static async verificationEmail(payload: { email: string; username: string; verificationUrl: string }) {
    return await sendEmail(
      payload.email,
      'Email verification | Shoesmart Ecommerce',
      { verificationUrl: payload.verificationUrl, username: payload.username },
      'verification',
    );
  }

  static async forgotPassword(payload: { email: string; OTP: string; username: string }) {
    return await sendEmail(
      payload.email,
      'Forgot Password | Shoesmart Ecommerce',
      { email: payload.email, OTP: payload.OTP, username: payload.username },
      'forgot-password',
    );
  }
}
