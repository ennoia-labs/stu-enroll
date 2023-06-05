import morgan from 'morgan';
import express from 'express';
import routes from '../routes';

export default function createServer() {
  const app = express();
  app.use(express.json());

  // morgan http logger
  app.use(morgan('tiny'));
  routes(app);

  return app;
}
