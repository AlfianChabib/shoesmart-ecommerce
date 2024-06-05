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

  static async forgotPassword(email: string) {
    return await sendEmail(email, 'Forgot Password | Shoesmart Ecommerce', { email: email }, 'forgot-password');
  }
}
