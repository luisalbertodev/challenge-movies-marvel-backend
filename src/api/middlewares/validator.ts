import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateSchema = (schema: Joi.Schema, property: string) => {
  return (req: Request | any, res: Response, next: NextFunction) => {
    return schema
      .validateAsync(req[property])
      .then((val) => next())
      .catch((error) => {
        next(error);
      });
  };
};
