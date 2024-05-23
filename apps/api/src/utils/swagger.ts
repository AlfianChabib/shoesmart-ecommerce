import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version, name } from '../../package.json';
import { logger } from './logger';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name.toUpperCase(),
      version,
    },
    tags: [{ name: 'Authentication', description: 'Authentication' }],
    host: 'localhost:8000',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: ['./src/**/*.ts'],
};

const swagerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagerSpec));
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagerSpec);
  });
  logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
