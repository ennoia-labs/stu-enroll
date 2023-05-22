import logger from '../utils/logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateStudentInput } from '../schema/student';
import { createStudent, getAllStudents } from '../service/student';

export async function createStudentHandler(
  req: Request<{}, {}, CreateStudentInput['body']>,
  res: Response
) {
  try {
    const { _id } = await createStudent(req.body);
    return res.status(StatusCodes.OK).json({ _id }); // TODO: change status to CREATED
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}

export async function getStudentsHandler(req: Request, res: Response) {
  try {
    const students = await getAllStudents();
    return res.status(StatusCodes.OK).json({ students });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}
