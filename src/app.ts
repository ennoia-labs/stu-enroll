import express from 'express';
import logger from './utils/logger';
import connect from './utils/connect';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
});
