import dotenv from 'dotenv';
import logger from './utils/logger';
import connect from './utils/connect';
import createServer from './utils/server';

dotenv.config();

const PORT = process.env.PORT;

const app = createServer();

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
});
