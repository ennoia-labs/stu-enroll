import { AnyZodObject } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(StatusCodes.BAD_REQUEST).send(e.errors);
    }
  };
}
