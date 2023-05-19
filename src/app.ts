import express from 'express';
import logger from './utils/logger';
import connect from './utils/connect';
import dotenv from 'dotenv';
import routes from './routes';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();

  routes(app);
});
