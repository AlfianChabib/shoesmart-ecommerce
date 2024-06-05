import crypto from 'crypto';

export const hashToken = (payload: string): string => {
  return crypto.createHash('sha256').update(payload).digest('hex');
};
