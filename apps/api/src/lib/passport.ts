import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { localVerify } from '../helpers/strategy-helper';
import env from '../app/config';

export type CallbackLocal = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

const localStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done: CallbackLocal) => {
    try {
      localVerify(email, password, done);
    } catch (error) {
      done(error);
    }
  },
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      done(null, profile);
    } catch (error) {
      if (error instanceof Error) {
        done(error, false, { message: error.message });
      }
    }
  },
);

export const strategy = { localStrategy, googleStrategy };
