import { CallbackLocal } from '../lib/passport';

export const localVerify = (email: string, password: string, done: CallbackLocal) => {
  try {
    done(null, { email, password });
  } catch (error) {
    done(error);
  }
};
