import { z } from 'zod';
import App from './app/app';

const main = () => {
  // configs();

  const app = new App();
  app.start();
};

main();
