import dotenv from 'dotenv';
import logger from './logger';
import mongoose from 'mongoose';

dotenv.config();

async function connect() {
  const DB_URI = process.env.DB_URI as string;
  // const DB_URI: string = process.env.DB_URI_MOCK as string;

  try {
    await mongoose.connect(DB_URI);
    logger.info('Connected to the database!');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export default connect;
