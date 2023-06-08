import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './utils/logger';
import connect from './utils/connect';
import createServer from './utils/server';

dotenv.config();

const PORT = process.env.PORT;

const app = createServer();
// morgan http logger
app.use(morgan('tiny'));

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect();
});
