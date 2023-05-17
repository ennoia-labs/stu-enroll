import logger from './logger';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
  const DB_URI = process.env.DB_URI;

  try {
    await mongoose.connect(DB_URI);
    logger.info('Connected to the database!');
  } catch (error) {
    logger.error('Could not connect to db!');
    process.exit(1);
  }
}

export default connect;
