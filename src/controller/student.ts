import logger from '../utils/logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createStudent } from '../service/student';
import { CreateStudentInput } from '../schema/student';

export async function createStudentHandler(
  req: Request<{}, {}, CreateStudentInput['body']>,
  res: Response
) {
  try {
    const { _id } = await createStudent(req.body);
    return res.status(StatusCodes.OK).json({ _id });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}
