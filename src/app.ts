import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import logger from './utils/logger';
import connect from './utils/connect';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// morgan http logger
app.use(morgan('tiny'));

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();

  routes(app);
});
