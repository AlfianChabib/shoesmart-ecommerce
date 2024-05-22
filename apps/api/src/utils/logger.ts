import winston from 'winston';
import SlackHook from 'winston-slack-webhook-transport';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'API' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new SlackHook({ webhookUrl: process.env.SLACK_WEBHOOK_URL, format: winston.format.simple() }),
  ],
});
