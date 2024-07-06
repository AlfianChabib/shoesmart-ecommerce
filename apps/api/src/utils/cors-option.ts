import { CorsOptions } from 'cors';
import env from '../app/config';

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: [env.BASE_FRONTEND_URL],
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
};
