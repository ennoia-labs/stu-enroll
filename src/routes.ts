import { Express, Request, Response } from 'express';
import { createStudentSchema } from './schema/student';
import { validate } from './middleware/validateResource';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  createStudentHandler,
  getStudentHandler,
  getStudentsHandler,
  updateStudentHandler,
} from './controller/student';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });

  app.post('/student', validate(createStudentSchema), createStudentHandler);
  app.get('/students', getStudentsHandler);
  app.get('/students/:id', getStudentHandler);
  app.patch('/students/:id', updateStudentHandler);
}
