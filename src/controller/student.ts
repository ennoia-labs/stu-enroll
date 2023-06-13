import logger from '../utils/logger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateStudentInput } from '../schema/student';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudent,
  queryString,
  updateStudent,
} from '../service/student';
import { OBJECT_ID_REGEX } from '../constants';

export async function createStudentHandler(
  req: Request<{}, {}, CreateStudentInput['body']>,
  res: Response
) {
  try {
    const { _id } = await createStudent(req.body);
    return res.status(StatusCodes.CREATED).json({ _id });
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
}

export async function getStudentsHandler(
  req: Request<{}, {}, {}, queryString>,
  res: Response
) {
  try {
    const { limit } = req.query;
    const students = await getAllStudents({ limit });

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

    if (student === null) {
      return res.status(StatusCodes.NOT_FOUND).end();
    }

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

export async function deleteStudentHandler(req: Request, res: Response) {
  try {
    const { params } = req;
    if (params === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const { id } = params;
    if (!id.match(OBJECT_ID_REGEX)) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    await deleteStudent(id);
    return res.status(StatusCodes.OK).end();
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.BAD_REQUEST).send(e.message);
  }
}
