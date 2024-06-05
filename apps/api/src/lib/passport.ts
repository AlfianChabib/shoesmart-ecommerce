import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth-service';
import env from '../app/config';

const googleStrategy = new GoogleStrategy(
  { clientID: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, callbackURL: env.GOOGLE_CALLBACK_URL },
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      AuthService.googleVerify(profile, done);
    } catch (error) {
      if (error instanceof Error) {
        done(error, false, { message: error.message });
      }
    }
  },
);

export const strategy = { googleStrategy };
