import winston from 'winston';
import DiscordTransport from 'winston-discord-transport';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'API' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new DiscordTransport({
      webhook: process.env.DISCORD_WEBHOOK_URL,
      defaultMeta: { service: 'API' },
    }),
  ],
});
