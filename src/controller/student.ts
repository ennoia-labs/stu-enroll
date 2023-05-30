import logger from '../utils/logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateStudentInput } from '../schema/student';
import {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
} from '../service/student';

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

export async function getStudentHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    if (params === undefined) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const { id } = params;
    if (id === undefined) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const student = await getStudent(id);
    return res.status(StatusCodes.OK).json({ student });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}

export async function updateStudentHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    if (params === undefined) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const { id } = params;
    if (id === undefined) {
      return res.status(StatusCodes.BAD_REQUEST);
    }

    const { body: data } = req;

    const updatedStudent = await updateStudent(id, data);
    return res.status(StatusCodes.OK).json({ updatedStudent });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
}
