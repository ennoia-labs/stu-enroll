import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export interface CustomRequest extends Request {
  _id?: string;
  email?: string;
}

export async function authenticate(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const JWT_SECRET = process.env.JWT_SECRET as string;

  try {
    const { _id, email } = jwt.verify(token, JWT_SECRET) as {
      _id: string;
      email: string;
    };

    req._id = _id;
    req.email = email;
    next();
  } catch (error: any) {
    switch (error.name) {
      case 'TokenExpiredError':
        logger.error('JWT has expired');
        break;
      case 'JsonWebTokenError':
        logger.error('Invalid JWT:', error.message);
        break;
      default:
        logger.error('JWT verification failed:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }

    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
