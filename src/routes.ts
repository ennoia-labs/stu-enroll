import { Express, Request, Response } from 'express';
import { createStudentSchema } from './schema/student';
import { validate } from './middleware/validateResource';
import { createStudentHandler } from './controller/student';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });

  app.post('/student', validate(createStudentSchema), createStudentHandler);
}
