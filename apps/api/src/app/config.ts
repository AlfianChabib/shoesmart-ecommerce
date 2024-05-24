import { config } from 'dotenv';
import { resolve } from 'path';
import { z } from 'zod';

export const NODE_ENV = process.env.NODE_ENV || 'development';
const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../../${envFile}`) });
config({ path: resolve(__dirname, `../../${envFile}.local`), override: true });

export const PORT = process.env.PORT || 8000;

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8000),
  BASE_FRONTEND_URL: z.string().url(),
  SLACK_WEBHOOK_URL: z.string().url(),
  DISCORD_WEBHOOK_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().trim(),
  GOOGLE_CLIENT_SECRET: z.string().trim(),
  GOOGLE_CALLBACK_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export default env;
