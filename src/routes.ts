import studentsRouter from './routes/students';
import { Express, Request, Response } from 'express';
import { authenticate } from './middleware/authenticate';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  });

  app.use('/students', authenticate, studentsRouter);
}
