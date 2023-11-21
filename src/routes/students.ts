import { Router } from 'express';
import { createStudentSchema } from '../schema/student';
import { validate } from '../middleware/validateResource';

import {
  getStudentHandler,
  getStudentsHandler,
  createStudentHandler,
  deleteStudentHandler,
  updateStudentHandler,
} from '../controller/student';

const studentsRouter = Router();

studentsRouter.post('/', validate(createStudentSchema), createStudentHandler);
studentsRouter.get('/', getStudentsHandler);
studentsRouter.get('/:id', getStudentHandler);
studentsRouter.patch('/:id', updateStudentHandler);
studentsRouter.delete('/:id', deleteStudentHandler);

export default studentsRouter;
